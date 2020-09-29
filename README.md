# Perpay Interview Dashboard - Frontend 
---
##### This frontend is a single-page react application, and ingests a REST api provided by the backend service (**[perpay-backend](https://github.com/Sciguystfm/perpayBackend)**)


##### The Application can be seen in action on heroku:
## [https://perpay-frontend.herokuapp.com/](https://perpay-frontend.herokuapp.com/)


### Install Process (Docker)
---
##### 1. Clone a copy of the repo `https://github.com/Sciguystfm/perpayFrontend.git`
##### 2. Modify the Dockerfile with the URL of your backend (`REACT_APP_BACKEND_URL`)

```
RUN apk add --update -y npm
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL ###Change me!, or use the default hosted url##

COPY . .
```
#### 3. Build the front end image `docker build -t frontendlocal:1.0 .`
#### 4. Run the image as a container 
```
docker run -d --name frontend -e "PORT=80" -p 8080:80 frontendlocal:1.0
```
#### And at that point you should be good! The frontend should be live on `localhost:8007/` 



### Install Process (*Not* Docker) (Something's gone horribly wrong)
---
##### 1. Clone a copy of the repo `https://github.com/Sciguystfm/perpayFrontend.git`
##### 2. Modify the Dockerfile with the URL of your backend (`REACT_APP_BACKEND_URL`)

```
RUN apk add --update -y npm
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL ###Change me!, or use the default hosted url##

COPY . .
```
##### 3. Make sure you have yarn installed `apt-get install yarn`
##### 4. Create a `.env` file and add set a custom backend value, or add the hosted backend's url
```
REACT_APP_BACKEND_URL=https://perpay-backend.herokuapp.com/
```
##### 5. Run the command `yarn install` to install all the projects dependencies
##### 6. Start the application with `yarn start` or `npm run start`

---
#### And at that point you should be good! The frontend should be live on localhost:3000/