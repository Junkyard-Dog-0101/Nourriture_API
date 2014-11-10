api-nourriture
==============
ping
We have to understand how foreign-key works with mongoose and then implement the different ./app/models needed.

curl test :

curl -X GET "http://127.0.0.1:8080/api/recipes/"
curl -X POST --data "name=toto" "http://127.0.0.1:8080/api/recipes/"
