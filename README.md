# angular-store
Ecommerce app with admin panel built with .Net Core 3.1 and Angular.

# How to install

Clone the repo to your machine
```
$ git clone https://github.com/chadwinjdeysel/angular-store
```

Open solution in terminal of your choice 

## Backend

From the route folder, cd into the api folder
```
cd store.api
```

restore nuget packages

run the program
```
dotnet run
```

## Frontend

From the route folder, cd into the spa folder
```
cd store-spa
```

Install node packages
```
npm install
```

Run the Angular application
```
ng serve
```

## Browser

Once frontend has been served successfully, navigate to localhost:4200 in your browser of choice and use the application

# How to Use

The application allows you to view products and filter through the products by category. 
Products can be added to a cart and an order can then be created. 
An admin panel can be access to view orders and manage products (CRUD operations)

Certain parts of the app is protected by role based authorisation. 
Credentials to login:
* User Role: user(username) and P@ss123(password)
* Admin Role: admin(username) and P@ss123(password)