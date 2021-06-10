# SaraFan Radio

This a service provider application

## Usecase
The Alpha users will be a beauty services provider like hair cutting, nails etc.
A customer will be able to schedule an appointment using site or a bot

## Deploy to github page

ng build --configuration production --base-href="https://katesky.github.io/sarafan-radio/"
ngh --message="github deploy"

ng build --configuration production --outputPath=docs --base-href "https://katesky.github.io/sarafan-radio/" ngh --message="github deploy"

### More tha 10 lines of code

git log --pretty=format: --name-only | sort | uniq -c | sort -rg | head -10


### To run documentation with Compodoc


This is not showing the library code may remove, just playing with 

https://compodoc.app/guides/installation.html

run from shell-app folder:

npx compodoc -p tsconfig.doc.json
