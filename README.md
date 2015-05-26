Nourriture
==============
How to run this project
---------
This project is based on nodejs. So we assume that you've finished setting the nodejs development envirement including nodejs,mongodb and npm.

Our development envirment is set on Ubuntu 14.04,and the development machine must have good intenet connection.

After you've get the code from the github, run:`npm install`,if it comes error message,try to use `sudo npm install`.

Then, at the root directory of the project, run `bower install`, after it finished, you will see a folder named bower_components, you should cut it into the 'app' folder.

Then you create a folder named 'uploads' in the app folder,in which will hold pictures you uploaded

Then make sure your mongodb service is running.

And run the code to start node server:`node app.js` 

How to test this project
---------
just open up your browser and visit the website:

http://127.0.0.1:1337

enjoy it!
