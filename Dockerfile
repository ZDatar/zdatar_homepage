FROM nginx:alpine

# Install OpenSSL for SSL certificate generation (if needed)
RUN apk add --no-cache openssl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the landing page
COPY index.html /usr/share/nginx/html/index.html

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Expose HTTPS port
EXPOSE 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
