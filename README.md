api-nourriture
==============
How to run this project
---------
This project is based on nodejs. So we assume that you've finished setting the nodejs development envirement including nodejs,mongodb and npm.

Our development envirment is set on Ubuntu 14.04,and the development machine must have good intenet connection.

After you've get the code from the github, run:`npm install`,if it comes error message,try to use `sudo npm install`.

Then make sure your mongodb service is running.

And run the code to start node server:`node app.js` 

How to test this project
---------
User curl to test :

1.register a user named toto and password is toto

`curl -X POST --data "username=toto&password=toto" "http://127.0.0.1:1337/api/register/"`

2.register a user named titi and password is titi

`curl -X POST --data "username=titi&password=titi" "http://127.0.0.1:1337/api/register/"`

3.toto login and send message "coucou" to titi

`curl -X POST --header "Authorization: Basic dG90bzp0b3Rv" --data "to=5461e4db13fbfb3829886ad5&content=coucou" "http://127.0.0.1:1337/api/sendMessage"`

mark:dG90bzp0b3Rv is toto:toto in base64 (https://www.base64decode.org/)
to=user_id
