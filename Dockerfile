FROM mhart/alpine-node:11 AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs

# ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL="https://perpay-backend.herokuapp.com/"

COPY . .

RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD serve -p $PORT -s .
