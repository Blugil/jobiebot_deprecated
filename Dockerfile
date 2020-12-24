FROM node:latest

COPY . .

RUN npm install
RUN apt-get update && apt-get install -y ffmpeg

CMD [ "npm", "start" ]