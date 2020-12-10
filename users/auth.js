const UserDb = require("../models/user.js");
const bcrypt = require("bcrypt");

const users = {

    //register a user, takes in a user object and calls a mongodb defined above
    register: function (userObj) {
        return new Promise((resolve, reject) => {
            //hashes supplied password
            userObj.password = bcrypt.hashSync(userObj.password, 10);
            //checks db for an existing email
            UserDb.findOne({ email: userObj.email }, (err, existingUser) => {
                if (existingUser) {
                    //rejects and sends error message
                    reject("Email already in use");

                } else {
                    //calls db and creates user
                    UserDb.create(userObj)
                        .then((data) => {
                            //returns the data on success
                            resolve(data)
                        })
                        .catch((error) => {
                            //if and error happened it will return an error message
                            reject("Couldn't add user");
                        });
                }
            })

        })

    },

    //login user using supplied user object
    login: function (userObj) {
        return new Promise((resolve, reject) => {
            //calls database and searches for email
            UserDb.findOne({ email: userObj.email }, (err, foundUser) => {
                if (foundUser) {
                    //compares password supplied to hashed pass in db
                    const comparePass = bcrypt.compareSync(userObj.password, foundUser.password);
                    //will return true if it matches
                    if (comparePass) {
                        //returns the user info from db
                        resolve(foundUser);
                    } else {
                        //email is incorrect, sends error message
                        reject("Incorrect email or password");
                    }
                }else {
                    //couldn't find user so it sends error message
                    reject("Incorrect email or password");
                }

            })

        })

    },

    //used to delete a user from the database
    delete: function (userObj) {
        return new Promise((resolve, reject) => {
            if(userObj.password === process.env.DELETE_KEY) {
                UserDb.findOneAndDelete({ uuid: userObj.uuid }, (err, foundUser) => {
                    if(foundUser){
                        resolve(foundUser);
                    }else{
                        reject("Could not find user");
                    }
                });
            }else {
                reject("Incorrect password");
            };
            
        });
    }

};

module.exports = users;