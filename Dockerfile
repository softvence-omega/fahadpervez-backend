 
FROM node:18


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run build


EXPOSE 5000
EXPOSE 27017


CMD ["node", "dist/server.js"]
