# Build Angular
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx
FROM nginx:alpine

# BORRAR HTML por defecto
RUN rm -rf /usr/share/nginx/html/*

# COPIAR BUILD DE ANGULAR
COPY --from=build /app/dist/app-stickers /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
