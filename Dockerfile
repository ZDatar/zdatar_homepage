FROM nginx:alpine

# Install required packages
RUN apk add --no-cache openssl gettext

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the landing page as template
COPY index.html /usr/share/nginx/html/index.html.template

# Copy the entrypoint script
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

# Expose HTTPS port
EXPOSE 443

# Use the entrypoint script
CMD ["/entrypoint.sh"]
