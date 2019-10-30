## Report for October 30

_Biweekly report about biggest challenges and risks, and learning outcomes_

We had some trouble with docker and with getting our frontend and backend servers, our database and our network that connects all of those to run correctly. The errors we got were often cryptic and not very helpful and many supposed solutions we found while websearching the errors didn't help at all, but we learned how to deal with them and how to interpret them.

One problem was that the database scheme was changed and the solution was we needed to delete the old database and create a new one, or more precisely, tell docker to do that, but that wasn't clear from the console errors or from the webconsole errors. But we figured it out by trying lots of different proposed solutions and seeing what worked.

Pruning docker also helped at other times when there were problems with the docker network or old docker containers. And we now know better how to troubleshoot such problems.

One time, there was also a problem with the server setings and once with the docker-compose yaml file. At least the latter problem could have been avoided by testing more before pushing changes to these files to github.

Testing more, both manually and by writing actual tests, would have been useful in many cases and is certainly one improvement we need to make. If we don't do that, we risk losing a lot more time to trying to fix bugs that could have been more easily found with tests.

With our actual app-specific code we had fewer problems. But a difficulty was to coordinate backend and frontend so that api calls would work. We had some errors due to incompatible variable names. Since this was because of lack of information about the what the api would expect and return, we decided to specify the api in our wiki. But knowing (or rather: deciding) what exactly an api should send and receive continues to be an ongoing challenge.

In the backend, we used postman to test our api, and introduced promises in the register controller to better handle errors, models were added for users and database objects, passwords are hashed before storing them in the database. In the frontend, we implemented models for the validation messages and for the users (though the latter is still very much a work in progress). We improved the deisgn, user interface, styling and navigation. Each page now has a unique title that is displayed in the browser tab so that they're easier to differentiate. Frontend and backend together implemeted a user administration page where approved and unapproved users can be displayed and unapproved users can be approved. What still needs to be done is that only admins can access the user administration page. User registration and login is implemented and works. Routing upon successful login and registration works, if they are unsuccessful or there was an error either in the backend or in the frontend, an error is displayed to the user and they aren't routed to a different page. If the user isn't activated yet, they can't login and a message is displayed. A JWT is created on login, sent to the user, stored locally on their device, and then should be sent to the backend with every sensitive api request. But this latter part isn't completely implemented yet. Route guarding is also still very rudimentary and barely activated. We also created a profile page where the user can edit the information the user saved when registering and add additional information, but it has no real functionality as of yet. We also still need to define what information we exactly need from the user and how to model it, especially how to model the services.

Implementing these things certainly was challenging and we had to google a lot, but in the end we learned how to do it.

We also created a new git branch for development and we use the master branch for milestone releases.
