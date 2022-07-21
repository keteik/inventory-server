#  Inventory server backend  

[Install](#Installation-req)    
[Enviromental variables](#Enviromental-variables)     
[Development](#Development)     
[Production](#Production)   
[Docker](#Docker)   
[Project-scripts](#Project-scripts) 

### Installation req:

  *Install these resources for nice and easy env for development && production.*  
  | **MongoDB** & **Node.JS** [ TypeORM & ExpressJS, cpx] |

### Steps to install this project:

01. Clone repo to local
```
git clone https://github.com/keteik/inventory-server.git
```
02. Run installation of package.json  
```
npm install
```

### Enviromental variables:

01. Create .env file with this variables and specifay each of them
```
HTTP_PORT
MONGO_URI
SECRET
REFRESH_TOKEN_EXPIRATION
TOKEN_EXPIRATION
```

### Development:

0. Run in development
``` 
npm run dev 
```  

### Production:

00. Build project
```
npm run build
```
01. Run in production
```
npm run start
```

### Docker:

00. Build backend image
```
docker build . -t image-name
```
01. Run backend and db containers
```
docker compose up
```

### Project scripts:  

|             |                                                           |
| ------------|-----------------------------------------------------------|
| start       | node ./build/app.js                                       |
| dev         | nodemon -x node --no-warnings --experimental-specifier-resolution=node --loader ts-node/esm src/app.ts|
| build       | tsc-esm                                                   |
