FROM node:latest
COPY . .
WORKDIR /backend
COPY ./package*./json ./
RUN npm install

EXPOSE 3000

CMD ["npm","start"]
