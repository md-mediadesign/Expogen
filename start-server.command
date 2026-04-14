#!/bin/bash
cd "$(dirname "$0")"
PORT=8000
echo "───────────────────────────────────────"
echo "  EXPOGEN lokal starten auf Port $PORT"
echo "───────────────────────────────────────"
open "http://localhost:$PORT/index.html"
python3 -m http.server $PORT
