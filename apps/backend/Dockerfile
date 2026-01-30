FROM node:20-alpine

WORKDIR /app

# Build-Tools für native Module
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm ci

COPY . .

RUN mkdir -p public/uploads

RUN npm run build

EXPOSE 1337
CMD ["npm", "start"]
