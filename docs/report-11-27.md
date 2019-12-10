
## Report for November 27

_Biweekly report about biggest challenges and risks, and learning outcomes_

---

Instead of a fixed colour scheme, there's now a theme service which allows the user pick one of three themes which is then applied to every page of the app.

For services and events, there are now two different types of pages for each: A page to create, edit, and delete them, and a page to display a single service or event. This means a user can view all of his previously saved services on one page, add new services and delete old ones. 

To this purpose there is a dedicated api to save new services, another one to edit existing services, and one to delete services. As soon as a service has been created, it can be displayed on a separate page which is done by yet another api. The user profile displays all services a user has created and links to each service's display page. All of this was also done in analogous form for events.

In order to find a service or an event (or even a user), we've implemented a search function where you can specify whether you want to search everything, or only either services, or events, or users, or only specific attribute of services, events, or users, such as a user name or a service description. The search resulted are split (both in the frontend and in the backend) into three different sections: services, events, and users. Each search result entry then links to a single page that displays the respective service, event, or user.

If the user who is viewing a single service page is an event manager, a booking form is displayed where the user can type in a message for the service provider and select one of the events for which the user wants to book the service and then send off the booking request by button click. But the rest of the booking process which would include approval by the service provider and display of the bookings to both users involved hasn't been implemented yet.

The database in the backend was switched from MySQL to PostgreSQL because Postgres was very good search functionality (case insensitive, k-nearest-neighbours-indexing, etc.). So to implement a good search, we had two options: either use a different database (such as Postgres) or use a search engine like ElasticSearch. But the latter would have been a bit disproportionate to the scale of the project, so we decided to switch the database to Postgres.

A privacy policy and terms and conditions were added, as well as a faq page. 

A lot of refactoring was done and many small improvements were made.

We're still time-pressed to get everything finished for the final milestone. We got a lot done in the last two weeks but there are features we had in mind when we first thought about what the app should be able to do, that we probably won't have time to implement. Especially since we also have to dedicate a good amount of the remaining time to things other than coding, such as usability testing, documentation, the readme, the final presentation, etc.
