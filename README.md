# ZDatar Landing Page - Docker HTTPS Setup

This repository contains a Docker Compose setup to run the ZDatar landing page with HTTPS using self-signed certificates.

## Features

- ✅ HTTPS enabled with self-signed certificates
- ✅ Runs on port 9443
- ✅ Always restart policy
- ✅ Nginx web server with security headers
- ✅ Automatic SSL certificate generation

## Quick Start

1. **Build and start the services:**
   ```bash
   docker-compose up -d
   ```

2. **Access the website:**
   - Open your browser and go to: `https://localhost:9443`
   - You'll see a security warning due to the self-signed certificate - click "Advanced" and "Proceed to localhost"

## Files Structure

```
├── docker-compose.yml    # Main Docker Compose configuration
├── Dockerfile           # Web server container definition
├── nginx.conf          # Nginx configuration with HTTPS
├── generate-ssl.sh     # SSL certificate generation script
├── index.html          # Your ZDatar landing page
└── ssl/               # Generated SSL certificates (auto-created)
```

## Commands

- **Start services:** `docker-compose up -d`
- **Stop services:** `docker-compose down`
- **View logs:** `docker-compose logs -f zdatar-web`
- **Rebuild:** `docker-compose up -d --build`

## SSL Certificate

The setup automatically generates a self-signed SSL certificate valid for 365 days. The certificate is stored in the `./ssl/` directory and includes:

- `server.crt` - SSL certificate
- `server.key` - Private key

## Security Features

- TLS 1.2 and 1.3 support
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Gzip compression enabled
- Static asset caching

## Troubleshooting

1. **Port already in use:** Make sure port 9443 is not being used by another service
2. **SSL certificate issues:** Delete the `ssl/` directory and restart to regenerate certificates
3. **Permission issues:** Ensure Docker has proper permissions to create files and directories

## Production Notes

For production use, replace the self-signed certificate with a proper SSL certificate from a Certificate Authority (CA) like Let's Encrypt.
