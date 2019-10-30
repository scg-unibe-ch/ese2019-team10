
## Report for October 30

_Biweekly report about biggest challenges and risks, and learning outcomes_

We had some trouble with docker and with getting our frontend and backend servers, our database and our network that connects all of those to run correctly. The errors we got were often cryptic and not very helpful and many supposed solutions we found while websearching the errors didn't help at all, but we learned how to deal with them and how to interpret them.

One problem was that the database scheme was changed and the solution was we needed to delete the old database and create a new one, or more precisely, tell docker to do that, but that wasn't clear from the console errors or from the webconsole errors. But we figured it out by trying lots of different proposed solutions and seeing what worked.

Pruning docker also helped at other times when there were problems with the docker network or old docker containers. And we now know better how to troubleshoot such problems.

One time, there was also a problem with the server setings and once with the docker-compose yaml file. At least the latter problem could have been avoided by testing more before pushing changes to these files to github.

Testing more, both manually and by writing actual tests, would have been useful in many cases and is certainly one improvement we need to make. If we don't do that, we risk losing a lot more time to trying to fix bugs that could have been more easily found with tests.

With our actual app-specific code we had fewer problems. But a difficulty was to coordinate backend and frontend so that api calls would work. We had some errors due to incompatible variable names. Since this was because of lack of information about the what the api would expect and return, we decided to specify the api in our wiki. But knowing (or rather: deciding) what exactly an api should send and receive continues to be an ongoing challenge.

We also created a new git branch for development and we use the master branch for milestone releases.

