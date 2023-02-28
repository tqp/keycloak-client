# Preparation
# - Preparation and Setup:
#   - To deploy directly to the "dist" folder, change
#     `angular.json -> projects -> architect -> build -> options -> outputPath` to:
#     "outputPath": "dist",

# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# 1. Build our Angular app
# Name the node stage "builder"
FROM node:alpine AS builder

# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
COPY . .

# install node modules and build assets
RUN npm install && npm run build --output-path=/dist

# 2. Deploy our Angular app to NGINX
FROM nginx:alpine

# Copy static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html/

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
