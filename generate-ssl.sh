#!/bin/sh

# Install OpenSSL if not present
apk add --no-cache openssl

# Create SSL directory if it doesn't exist
mkdir -p /ssl

# Check if certificates already exist
if [ -f "/ssl/server.crt" ] && [ -f "/ssl/server.key" ]; then
    echo "SSL certificates already exist. Skipping generation."
    exit 0
fi

echo "Generating self-signed SSL certificate for ZDatar landing page..."

# Generate private key
openssl genrsa -out /ssl/server.key 2048

# Generate certificate signing request
openssl req -new -key /ssl/server.key -out /ssl/server.csr -subj "/C=US/ST=State/L=City/O=ZDatar/OU=IT/CN=localhost"

# Generate self-signed certificate valid for 365 days
openssl x509 -req -days 365 -in /ssl/server.csr -signkey /ssl/server.key -out /ssl/server.crt

# Set proper permissions
chmod 600 /ssl/server.key
chmod 644 /ssl/server.crt

# Clean up CSR file
rm /ssl/server.csr

echo "SSL certificate generated successfully!"
echo "Certificate: /ssl/server.crt"
echo "Private Key: /ssl/server.key"
