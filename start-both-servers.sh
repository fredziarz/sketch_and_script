#!/bin/bash

# Kill any existing servers on these ports
echo "🧹 Cleaning up old servers..."
lsof -ti:8080,8000 2>/dev/null | xargs -r kill -9 2>/dev/null
sleep 1

echo "🚀 Starting servers..."

# Start CMS in background
cd /home/michal/Documents/sketchAndScript-cms
python3 -m http.server 8080 > /dev/null 2>&1 &
CMS_PID=$!

# Start Dev Site in background
cd /home/michal/Documents/sketchAndScript
python3 -m http.server 8000 > /dev/null 2>&1 &
DEV_PID=$!

sleep 2

# Check if they're running
if kill -0 $CMS_PID 2>/dev/null && kill -0 $DEV_PID 2>/dev/null; then
    echo "
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Both servers running!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📂 CMS:      http://localhost:8080
🌐 Dev Site: http://localhost:8000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌐 Opening in browser...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

To stop servers:
  ./stop-servers.sh

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"
    # Save PIDs for easy cleanup
    echo "$CMS_PID $DEV_PID" > /tmp/sketchandscript_servers.pid
    
    # Open both URLs in default browser
    sleep 1
    xdg-open "http://localhost:8080" 2>/dev/null &
    sleep 1
    xdg-open "http://localhost:8000" 2>/dev/null &
    
else
    echo "❌ Error: Failed to start one or both servers"
    exit 1
fi
