FROM nginx:latest

# Copy static website files
COPY dist/ /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf
