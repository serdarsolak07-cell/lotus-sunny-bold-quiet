FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 8080
ENV HOST=0.0.0.0
CMD ["npm", "run", "dev"]
