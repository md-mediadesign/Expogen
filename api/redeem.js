// Löst eine Stripe-Zahlung genau einmal in Credits ein.
// Erwartet POST { id } mit Checkout-Session-ID (cs_…, aus der Payment-Link-Rückleitung)
// oder Zahlungs-ID (pi_…, für manuelle Freischaltung durch den Support).
// Die Einlösung wird als Metadaten an der Zahlung in Stripe vermerkt — keine eigene Datenbank nötig.
// Benötigt die Umgebungsvariable STRIPE_SECRET_KEY (eingeschränkter Schlüssel:
// Checkout Sessions lesen, PaymentIntents schreiben, Charges lesen).

const CREDITS_BY_AMOUNT = { 490: 1, 1990: 5, 3490: 10, 6990: 25 };
const ID_PATTERN = /^(cs_(live|test)_|pi_)[A-Za-z0-9]+$/;

async function stripe(path, form) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method: form ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: form ? new URLSearchParams(form).toString() : undefined,
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Stripe ${res.status}`);
  return res.json();
}

function reply(res, status, body) {
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(body);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return reply(res, 405, { error: 'method' });
  if (!process.env.STRIPE_SECRET_KEY) return reply(res, 500, { error: 'config' });

  const id = String((req.body && req.body.id) || '').trim();
  if (!ID_PATTERN.test(id)) return reply(res, 400, { error: 'invalid' });

  try {
    let paymentIntentId = id;
    let amount = null;

    if (id.startsWith('cs_')) {
      const session = await stripe(`checkout/sessions/${id}`);
      if (!session) return reply(res, 404, { error: 'invalid' });
      if (session.payment_status !== 'paid' || !session.payment_intent) return reply(res, 402, { error: 'unpaid' });
      paymentIntentId = session.payment_intent;
      amount = session.amount_subtotal;
    }

    const intent = await stripe(`payment_intents/${paymentIntentId}?expand[]=latest_charge`);
    if (!intent) return reply(res, 404, { error: 'invalid' });
    if (intent.status !== 'succeeded') return reply(res, 402, { error: 'unpaid' });

    const charge = intent.latest_charge;
    if (charge && (charge.refunded || charge.amount_refunded > 0)) return reply(res, 410, { error: 'refunded' });
    if (intent.metadata && intent.metadata.expogen_redeemed) return reply(res, 409, { error: 'redeemed' });

    const credits = CREDITS_BY_AMOUNT[amount ?? intent.amount];
    if (!credits) return reply(res, 422, { error: 'unknown_amount' });

    await stripe(`payment_intents/${paymentIntentId}`, {
      'metadata[expogen_redeemed]': new Date().toISOString(),
      'metadata[expogen_credits]': String(credits),
    });

    return reply(res, 200, { credits });
  } catch (e) {
    return reply(res, 502, { error: 'stripe' });
  }
};
