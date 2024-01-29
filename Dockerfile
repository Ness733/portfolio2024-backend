FROM node:alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

ENV DB_NAME=mvfqgowf
ENV DB_USERNAME=mvfqgowf
ENV DB_PASSWORD=maDNjjO-_QJmL3lzG7Of2DHKGMnyH4xd
ENV DB_HOSTNAME=silly.db.elephantsql.com
ENV DB_DIALECT=postgres
ENV SECRET_KEY=Krahe73
ENV PORT=3001
ENV HOST=0.0.0.0


COPY . .
EXPOSE 3001
CMD ["node", "backend/index.js"]