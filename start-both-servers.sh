#!/bin/bash

# Start CMS and Dev Site together
echo "🚀 Starting servers..."

# CMS on port 8080
gnome-terminal --title="CMS (localhost:8080)" -- bash -c "cd /home/michal/Documents/sketchAndScript-cms && python3 -m http.server 8080; exec bash" 2>/dev/null || {
    echo "Terminal 1: CMS"
    echo "cd /home/michal/Documents/sketchAndScript-cms && python3 -m http.server 8080 &"
    cd /home/michal/Documents/sketchAndScript-cms && python3 -m http.server 8080 &
}

sleep 1

# Dev Site on port 8000
gnome-terminal --title="Dev Site (localhost:8000)" -- bash -c "cd /home/michal/Documents/sketchAndScript && python3 -m http.server 8000; exec bash" 2>/dev/null || {
    echo "Terminal 2: Dev Site"
    echo "cd /home/michal/Documents/sketchAndScript && python3 -m http.server 8000 &"
    cd /home/michal/Documents/sketchAndScript && python3 -m http.server 8000 &
}

sleep 1

echo "
✅ Servers running:
   📂 CMS:      http://localhost:8080
   🌐 Dev Site: http://localhost:8000

Press Ctrl+C to stop background servers
"
