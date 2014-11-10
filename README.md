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

curl -X GET "http://127.0.0.1:8080/api/users/"
curl -X POST --data "username=test&password=123456" "http://127.0.0.1:8080/api/recipes/"
