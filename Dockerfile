FROM node:latest AS builder

ENV NODE_ENV production

COPY package*.json /opt/app-root/src/
RUN yarn install

COPY . /opt/app-root/src/
RUN npm run build


FROM nginx:latest

COPY --from=builder /opt/app-root/src/build/ .

# Use S2I run-script to start nginx server
CMD /usr/libexec/s2i/run
