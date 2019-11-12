
## Report for November 13

_Biweekly report about biggest challenges and risks, and learning outcomes_

Since the last report we had various mishaps and successes. 

We improved our modelling: On the backend, a role model was created which replaced the previous booleans of isAdmin, isServiceProvider and isEventManager. A user can have none, any or all roles; the roles belong to many users; and the server creates these roles at startup. On the frontend, there are now user models on the login, registration, admin, and profile pages. There are also models for the validation messages and some welcome messages. All these models make the code more flexible, since they are reusable and we don't need to repeat ourselves.

The admin functionality has been improved both visually and programmatically. Some examples: The approval functionality has been moved to a specific admin api so that it can be easily separated from normal user functionality. The frontend also has a specific admin service instead of a shared one and a specific admin guard so that the routes to the admin pages can be guarded and only be made accessible to logged in admins. Upon login, the backend sends a boolean to the frontend to tell it whether the user is an admin or not and thereupon adjusts the dashboard. On the user approval page, the users are sorted by last name and then first name. 

Login and logout works smoother. Logout actually works now, and upon logout the user is redirected to the home page and gets a goodbye message. The side-menu now displays different entries depending on whether the user is logged in or not, such as a logout button for logged-in users.

The routing has been improved in general, with (better) route guarding and a route and page for 404 page not found. 

On the editable profile page, events and services can be added and there's an api to load the page and one to save the page, though they as of yet only provide a subset of the user properties displayed on the actual page. 

The biggest challenge is probably not any specific technical issue but just the rising time pressure of implementing every feature the app is supposed to have before the deadline.


