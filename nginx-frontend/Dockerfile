# Use the official Nginx image
FROM nginx:alpine

# Copy static files
COPY static/ /usr/share/nginx/html/

# Copy custom Nginx configuration
COPY nginx-configmap.yaml /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
