#!/bin/bash
# Start the Sketch & Script CMS locally

echo "🚀 Starting Sketch & Script CMS..."
echo ""
echo "Opening CMS in your default browser..."
echo ""
echo "📍 CMS will be available at: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Kill any process using port 8080
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

# Try Python3 first
if command -v python3 &> /dev/null; then
    cd "$(dirname "$0")"
    python3 -m http.server 8080
elif command -v python &> /dev/null; then
    cd "$(dirname "$0")"
    python -m http.server 8080
elif command -v php &> /dev/null; then
    cd "$(dirname "$0")"
    php -S localhost:8080
else
    echo "❌ Error: No suitable server found!"
    echo ""
    echo "Please install one of the following:"
    echo "  • Python 3: https://python.org"
    echo "  • PHP: https://php.net"
    echo "  • Node.js (http-server): npm install -g http-server"
    exit 1
fi

