FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN npx tsc

EXPOSE 3002

CMD ["node", "bin/www"]