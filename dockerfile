# FROM nginx 

# WORKDIR /the/workdir/html 

# COPY . . 

# Build stage
FROM node:18 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build


# Run stage
FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]