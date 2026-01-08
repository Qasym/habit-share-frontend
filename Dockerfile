FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

# Copy the rest
COPY . .

# Vite dev server
EXPOSE 5173

# Ensure Vite binds to 0.0.0.0 for Docker port forwarding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
