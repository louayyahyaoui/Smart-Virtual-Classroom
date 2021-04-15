
# Node response

A package that helps debug in a more readable manner, by logging logged error and success message in the terminal in a well-formatted manner, which aids readability and helps in the separation of different logged responses as well as returning server success and error message in a general format throughout your codebase

## Getting Started

This instructions will get you started on how to use this package.

### Dependencies
* Nodejs
* npm (node package manager)


### Install via NPM
```
 npm install v-response to install dependency
```

## Usage
```
const response = require ("v-response");

```
## To log an error or success message ("tag",value)
```
response.log("this is an error: ", payemnterror);
response.log("payment successful: ", payemntsuccessful);

    -------------------------------------------------------------------------------
          this is an error: paymenterror
    -------------------------------------------------------------------------------
    
    
    -------------------------------------------------------------------------------
          payment successful: payemntsuccessful
    -------------------------------------------------------------------------------

```


## To return  an error or success message from the server
```
app.get("/", (req, res) => {
    let age = 1;
    if (age < 2) {
        return res.status(200)
            .json(response.ApiResponse(true, 200, "yes age is less than 2", age));
    }else {
        return  res.status(400)
            .json(response.ApiResponse(false,400,"no age is not less than 2",undefined,error));
    }

})
```


## To generate random Numbers either numeric or alphanumeric

```
app.get("/generate_opt",(req,res) => {
//expecting two callback (size,true | false)

//if set to true numbers and letters will be generated

//if set to false only numbers will be generated 

let Otp = response.generateOTCode(6,false);
response.log("OneTimePassword: ",Otp);

})
```
## Result
```
 -------------------------------------------------------------------------------
          OneTimePassword: 234574
    -------------------------------------------------------------------------------
```
   

## Author

* **tycodez** 


