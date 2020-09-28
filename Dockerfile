FROM mhart/alpine-node:11 AS builder
WORKDIR /app

# ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL="https://sheltered-plains-24604.herokuapp.com/"
# ENV REACT_APP_TEST_FLAG=$REACT_APP_TEST_FLAG
ENV REACT_APP_TEST_FLAG=False

COPY . .
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD serve -p $PORT -s .
