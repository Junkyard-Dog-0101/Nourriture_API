api-nourriture
==============
How to run this project
---------
This project is based on nodejs. So we assume that you've finished seting nodejs development envirement including nodejs,mongodb,npm.Then let's begin!
Our development envirment is set on Ubuntu 14.04,and the development machine must have good intenet connection.

After you've get the code, run:`npm install`,if it comes error message,try to use `sudo npm install`.

Then make sure your mongodb service is running.

And run the code to start node server:`node server.js` 

How to test this project
---------
curl test :
part 1 user:
1.1 test if the server is running:
curl -X GET "http://127.0.0.1:8080/api/users/"
1.2 add a user:
curl -X POST --data "username=test&password=123456&firstName=ftest&lastName=ltest&email=123@456.com&gender=male" "http://127.0.0.1:8080/api/users/register/"
1.3 user login
curl -X POST --data "username=test&password=123456" "http://127.0.0.1:8080/api/users/login/"
1.4 user logout
curl -X GET "http://127.0.0.1:8080/api/users/logout/"
1.5 display user profile,replace `userid` with the userid.
curl -X GET "http://127.0.0.1:8080/api/users/`userid`"
1.6 modify user profile
curl -X PUT --data "firstName=ftest&lastName=ltest&email=123@456.com&gender=male&introduction=Hello World&phoneNumber=12345678" "http://127.0.0.1:8080/api/users/`userid`"

part 2 food list

part 3 food in detail

part 4 message

part 5 admin
5.1 delete a user
curl -X DELETE "http://127.0.0.1:8080/api/users/`userid`"
