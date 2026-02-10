# Serve with Nginx + reverse proxy to API
FROM nginx:1.27-alpine

# Nginx config (SPA + /api proxy)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Vite outputs to /dist
COPY dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]