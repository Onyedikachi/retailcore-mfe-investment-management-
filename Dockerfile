# Use the Node.js base image
FROM ghcr.io/sterling-retailcore-team/node-base-image:18 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --ignore-scripts

COPY . .

RUN yarn build

# Stage 2 - Serve the application using Nginx
FROM ghcr.io/sterling-retailcore-team/nginx-base-image:3.17

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]