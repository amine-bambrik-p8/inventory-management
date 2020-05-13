# Important Note
This project main purpose is to showcase my skills in various web development frameworks/technologies from front-end to the back-end which is still work in-progress that why you are in the development branch by default
The project includes the following things:
## Previously used things that I have used for this project
* TypeScript/ES6
* Nrwl mono repo
* Angular 2+ Framework
* NgRx
* RxJS
* Adobe XD
* Git with a simple workflow
* Trello for tracking
* Node.js/Express.js for back-end (using TypeScript)
* Testing with jest
* UML basics for modelizing the software
* MongoDB/Mongoose for database
# Introduction 
This is a simple inventory management software for small shops that includes tracking of available product in stock,list suppliers/clients & clients orders history 

## Getting Started
The project has two main folders:
* docs that has the documentation for the project
  * UML diagrams
  * UI/UX documents
    * Low fidelity wireframes
    * High fidelity wireframes
    * Images of the source of inspiration of the UI/UX
* src that has the front-end and back-end of the app
## Prerequisites
To be able to view all the UML diagrams you will need to install [UMLet](https://www.umlet.com/) a desktop app for creating UML diagrams available for both Windows and Linux
To be able to open the wireframes you need [AdobeXD](https://www.adobe.com/products/xd.html)

## Walkthrough
### Express backend (TypeScript)
You can find the code for backend in the `express-backend` in the /src/apps/express-backend/src folder where you can find 
* The main entry to the server in the /src/apps/express-backend/src/index.ts file
* The express server app setup in the /src/apps/express-backend/src/main.ts file
* The Jwt Auth Controller and unit tests for Auth can be found under the /src/apps/express-backend/src/utils/auth folder
* The CRUD/REST Controller with its unit tests can be found under the /src/apps/express-backend/src/utils/crud folder it also includes basic CRUD/REST routes with a helper function to setup the routes
* In the /src/apps/express-backend/src/resources folder each model/entity has his own:
   * Mongoose Model
   * Joi Validation for incoming data
   * Routes and route mounting
   * Controller w/ unit tests
* The Orders controller is the most notable one which uses mongoose Transaction to increase the number of sold items of a product entry of a product before saving the order (Note that it still has some problems i have to fix although they are easy)
* All the resources are mounted in /src/apps/express-backend/src/resources/index.ts file
* In the /src/apps/express-backend/src/middleware folder you will find a
   * Joi data validation middleware
   * Basic role based authorization
   * Error handling route
#### Work to-do
I still have to add some simple tasks that you might have noticed they are missing like :
  * CSRF & XSS protection
  * More testing 
  * Logging with morgan 
  * Add text index on codebar and product names
  * Product Entry Controller integration tests
  * Implement an Alert system
  * Code Refectoring
  * etc .....
### Angular
You can find the code for the front end app in the `angular-web-client` the main app is in the /src/apps/angular-web-client/src folder where you can find:
  * Routes Lazy Loading
To be able easily create another app using the same REST API i have separated the UI Components from Services and NgRx store logic for getting data thanks to @nrwl/nx mono repo
In the  /src/libs/core-data/src/lib folder you will find:
  * NgRx store with reducers,effects and actions for each model/entity under the /state folder
  * Services for each model/entity
In the /src/libs/auth/src/lib you will find the:
  * Jwt auth service
  * Jwt interceptor for adding the token to auth header
  * Role based Auth Guard
In the /src/libs/common/src/lib there's a(n):
  * Basic CRUD controller
  * Interceptor for HttpRequest/Response to format the data before sending/receiving data
#### Work to-do
* Create Facades
* Create a Generic AuthService
* Create UI components
  
  
