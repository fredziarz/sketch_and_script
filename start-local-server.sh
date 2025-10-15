#!/bin/bash
# Local Development Server
# Run this to test your website locally before publishing

echo "🚀 Starting local development server..."
echo ""
echo "Your website will be available at:"
echo "   👉 http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Start Python HTTP server
python3 -m http.server 8000

