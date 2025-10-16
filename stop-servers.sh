#!/bin/bash

echo "🛑 Stopping servers..."
pkill -f "python3 -m http.server" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ Servers stopped"
    rm -f /tmp/sketchandscript_servers.pid
else
    echo "ℹ️  No servers were running"
fi

