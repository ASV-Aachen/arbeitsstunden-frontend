FROM node:latest AS builder

ENV NODE_ENV production

COPY package*.json /opt/app-root/src/
WORKDIR /opt/app-root/src/

RUN yarn install
# RUN npm install

COPY . .
RUN npm run build


FROM nginx:latest

COPY --from=builder /opt/app-root/src/build/ .

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]