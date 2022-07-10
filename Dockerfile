FROM node:16

WORKDIR /usr/app

COPY . ./

RUN npm install

EXPOSE 3000

run npm run build

CMD ["npm", "run", "start"]