FROM nginx:alpine

# Install OpenSSL for SSL certificate generation (if needed)
RUN apk add --no-cache openssl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the landing page
COPY index.html /usr/share/nginx/html/index.html

# Copy the wait script
COPY wait-for-ssl.sh /wait-for-ssl.sh
RUN chmod +x /wait-for-ssl.sh

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Expose HTTPS port
EXPOSE 443

# Use the wait script instead of starting nginx directly
CMD ["/wait-for-ssl.sh"]
