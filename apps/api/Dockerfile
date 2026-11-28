FROM node:20-alpine
WORKDIR /app
COPY apps/api/package*.json ./
RUN npm install --omit=dev
COPY apps/api/src ./src
COPY apps/api/test ./test
COPY database/schema.sql /schema.sql
EXPOSE 4000
CMD ["sh","-c","node src/migrate.js && node src/seed.js && node src/server.js"]
