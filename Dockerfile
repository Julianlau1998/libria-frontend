FROM node:lts-alpine as build-stage
WORKDIR /builddir
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /builddir
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
