#!/bin/sh

# ZDatar Landing Page Entrypoint Script
# This script substitutes environment variables in the HTML file

echo "Starting ZDatar Landing Page..."
echo "Substituting environment variables..."

# Check if GOOGLE_SCRIPT_URL is set
if [ -z "$GOOGLE_SCRIPT_URL" ]; then
    echo "WARNING: GOOGLE_SCRIPT_URL environment variable is not set!"
    echo "Please set it in your .env file or docker-compose.yml"
    GOOGLE_SCRIPT_URL="YOUR_GOOGLE_SCRIPT_URL_HERE"
fi

# Create the final HTML file by substituting environment variables
envsubst '${GOOGLE_SCRIPT_URL}' < /usr/share/nginx/html/index.html.template > /usr/share/nginx/html/index.html

echo "Environment variables substituted successfully"
echo "GOOGLE_SCRIPT_URL: $GOOGLE_SCRIPT_URL"

# Wait for SSL certificates (existing functionality)
echo "Waiting for SSL certificates to be generated..."

while [ ! -f /etc/nginx/ssl/server.crt ] || [ ! -f /etc/nginx/ssl/server.key ]; do
    echo "SSL certificates not found, waiting 2 seconds..."
    sleep 2
done

echo "SSL certificates found! Starting nginx..."

# Start nginx
exec nginx -g "daemon off;"
