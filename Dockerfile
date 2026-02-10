# Build React -> Serve with Nginx + reverse proxy to API

# Base image to build SPA
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

# Nginx config (SPA + /api proxy)
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Vite outputs to /dist
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]