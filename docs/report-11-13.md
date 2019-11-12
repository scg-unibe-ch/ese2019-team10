
## Report for November 13

_Biweekly report about biggest challenges and risks, and learning outcomes_

Since the last report we had various mishaps and successes. 

We improved our modelling: On the backend, a role model was created which replaced the previous booleans of isAdmin, isServiceProvider and isEventManager. A user can have none, any or all roles; the roles belong to many users; and the server creates these roles at startup. On the frontend, there are now user models on the login, registration, admin, and profile pages. There are also models for the validation messages and some welcome messages. All these models make the code more flexible, since they are reusable and we don't need to repeat ourselves.

The admin functionality has been improved both visually and programmatically. Some examples: The approval functionality has been moved to a specific admin api so that it can be easily separated from normal user functionality. The frontend also has a specific admin service instead of a shared one and a specific admin guard so that the routes to the admin pages can be guarded and only be made accessible to logged in admins. The backend also verifies whether the current user is logged in and is authorized to view the user admin page. Upon login, the backend sends a boolean to the frontend to tell it whether the user is an admin or not and thereupon adjusts the dashboard. On the user approval page, the users are sorted by last name and then first name. 

Login and logout works smoother. Logout actually works now, and upon logout the user is redirected to the home page and gets a goodbye message. The side-menu now displays different entries depending on whether the user is logged in or not, such as a logout button for logged-in users.

The routing has been improved in general, with (better) route guarding and a route and page for 404 page not found. 

On the editable profile page, events and services can be added and there's an api to load the page and one to save the page, though they as of yet only provide a subset of the user properties displayed on the actual page. There's also a new profile page where the profile can be displayed to other users but this isn't very functional yet.

The biggest challenge of these past two weeks was getting the JWT authentication and handling to work correctly. We encountered our recurring problem of having different variable names on the backend and on the frontend once again here. This would have been easiy to solve were it not for the misleading official documentation that gave outdated information in one place. But then, we had a weird 401 unauthorized error whose origin wasn't immediately obvious. Digging a little deeper, we found out that it was returned upon the options request that preceded every request. Looking up some documentation, we learned that options request always precede get, post or put request in a CORS environment and that the options request usually doesn't or possibly can't carry the JWT token. Knowing that much, we let the backend accept options request without a JWT. Still there was an error but not much time passed until we discovered that this was due to an Access-Control-Allow-Headers setting that didn't allow 'auth' headers.

The biggest future challenge and risk is probably not any specific technical issue but just the rising time pressure of implementing every feature the app is supposed to have before the deadline. Project management and team organization also turns out to be very difficult. No wonder there are people whose job it is to be full-time managers.


