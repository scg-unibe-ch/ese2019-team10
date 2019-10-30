## Report for October 30

_Biweekly report about biggest challenges and risks, and learning outcomes_

We had some trouble with docker and with getting our frontend and backend servers, our database and our network that connects all of those to run correctly. The errors we got were often cryptic and not very helpful and many supposed solutions we found while websearching the errors didn't help at all, but we learned how to deal with them and how to interpret them.

One problem was that the database scheme was changed and the solution was we needed to delete the old database and create a new one, or more precisely, tell docker to do that, but that wasn't clear from either the console errors or the webconsole errors. But we figured it out by trying lots of different proposed solutions and seeing what worked.

Pruning docker also helped at other times when there were problems with the docker network or old docker containers. And we now know better how to troubleshoot such problems.

One time, there was also a problem with the server settings and once with the docker-compose yaml file. At least the latter problem could have been avoided by testing more before pushing changes to these files to github.

Testing more, both manually and by writing actual tests, would have been useful in many cases and is certainly one improvement we need to make. If we don't do that, we risk losing a lot more time trying to fix bugs that could have been more easily found with tests.

With our actual app-specific code we had fewer problems. But a difficulty was to coordinate backend and frontend so that the API calls would work. We had some errors due to incompatible variable names. Since this was because of lack of information about what the API would expect and return, we decided to specify the API in our wiki. But knowing (or rather: deciding) what exactly an API should send and receive continues to be an ongoing challenge.

In the backend, we used Postman to test our API, and introduced promises in the register controller to better handle errors. Models were added for users and database objects. Passwords are hashed before storing them in the database. In the frontend, we implemented models for the validation messages and for the users (though the latter is still very much a work in progress). We improved the design, user interface, styling and navigation. Each page now has a unique title that is displayed in the browser tab so that they're easier to differentiate. We created a separate component for the header so that it can easily be changed in one location and this change gets applied to every page.

Frontend and backend together implemented a user administration page where approved and unapproved users can be displayed and unapproved users can be approved. What still needs to be done is that only admins can access the user administration page. User registration and login is implemented and works. Routing upon successful login and registration works, if they are unsuccessful or there was an error either in the backend or in the frontend, an error is displayed to the user and the users aren't routed to a different page. If the user isn't activated yet, they can't login and a message is displayed. A JWT is created on login in the backend, sent to the user, stored locally on their device, and should then be sent to the backend with every sensitive api request. But this latter part is only partially implemented as of yet. Route guarding is also still very rudimentary and barely activated. We also created a profile page where the user can edit the information with which the user registered and add additional information, but neither loading the information nor saving the edited information has been implemented. We also still need to define what information we exactly need from the user and how to model it, as well as how to model the services.

Implementing these things certainly was challenging and we had to consult a lot of guides and help websites, but in the end we learned how to complete our tasks.

We also created a new git branch for development and we use the master branch for milestone releases.
