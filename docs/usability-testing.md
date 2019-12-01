## Usability Testing

### Preparation 

The following features were believed to be ready to test:
- registration
- login
- edit user profile
- add new service / event
- edit existing service / event
- search
- interacting with the search results

We decided against giving the test users a written scenario for two main reasons: We wanted them to interact naturally with the app and not follow a preconceived script. Highly specific things we can test ourselves but user interaction flow is much harder for us to test which is why we wanted to focus on the latter. And we were in the middle of implementing and changing some features so we had to be flexible since we weren't sure what would work and what wouldn't. 

***

### Execution

We verbally explained the tasks to the users, let them comment on what they were doing, took written notes of their comments, of what they were doing, and of how they were interacting with the app. 

Testing was complicated by our setup where users needed admin approval before being able to login. So the users unfortunately had to wait while we were approving them on a second computer. This reduced the time we had for testing.

The testing was hampered by a grave bug that made search result links unclickable and therefore some pages became inaccessible to the test users and weren't tested.

***

### Documentation of Execution

_Observations during the testing, including comments given by the testers._

- error / validation messages too small
- bad contrast on some elements, such as text fields or headings
- bad contrast in some colour schemes
- city before postal code in registration form is unexpected and thus confusing
- unfortunate that scrolling is required on registration page
- text on registered page is too small
- login form has broken link to terms and conditions
- too many fields in profile form are required
- birthday field has confusing order of dates
- phone field accepts weird input
- too much scrolling needed on birthday field
- availability field on service page is unclear
  - what does it mean, what is the expected input?
- name field has no bottom line indicating there is input expected
- not obvious which fields are required
- tabs on search page are confusing:
  - testers expect page / search results to change when clicking on a tab
- searching with no input does nothing
- search results are supposedly clickable but nothing happens when clicked
- home page shows login and register button for logged in users
- 

***

### Interpretation of Results

#### Design / layout issues and considerations

- Text of error / validation messages too small: They seemed big enough during development but every computer / screen / browser / user combination is different and this wasn't given due consideration during development, leading to some users having difficulty reading the messages.
  - Solution: Increase text size.
- Text on registered page too small: We simply used the default Ionic styling for text on pages and assumed that this was enough but we were wrong.
  - Solution: Increase text size.
- Bad contrast: Not much work on design had been done at that point, no contrasting testing had been done at all.
  - Solution: ???
- Too many required fields in profile page: Our assumption was that people would want to know a lot about each other on an event platform but this made filling out the profile form somewhat annoying since you had to fill out everything in one go and couldn't fill it out intermittently.
  - Solution: Make some of the fields optional.
- City / postal code field order: The order wasn't really thought through.
  - Solution: Put postal code field before city field.
- Scroll to register is unfortunate: Yes it is but it is inevitable if there are many input fields. But requiring so many fields on registration is also somewhat unusual. Many registration form only require username and password and ask for more details after registration. This makes registration easier and therefore users are more likely to actually register.
  - Solution: Shorter registration form.
- Birthday is hard to fill out: This is just the standard Ionic datetime interface. But the default was set on today's date which doesn't make sense for a birthday field unless it's for an app used in a maternity ward. But scrolling is inevitable if you have to pick a date from a list and can't input it with the keyboard. It would be good to know which form of interaction got better results in big user interaction survey / studies but this seems beyond the scale of this project.
  - Solution: Change it to keyboard input.
- Phone field isn't restrictive enough: The reason for that is that some people write their phone numbers with slashes, or pluses at the front, or even with brackets. So we just allowed any input.
  - Allow only pluses, numbers and spaces.
- Availability field unclear: This is a known problem. We just haven't found a good name for this field yet. Picking field names is difficult; they should be as explanatory as entire sentences but consist of only one word (in the ideal case) to keep the form tight.
  - Solution: Rename the field to ???.
- Home page buttons: The home page was very much unfinished and we didn't know what its function and design were supposed to be.
  - Solution: Revamp the home page.


#### Features / functionality

- Clicking on search page tabs doesn't change displayed results: The tabs were intended as filters for the search. The supposed user interaction was to click on a search category, maybe select a search attribute, input a search term, then click on search or hit enter. Or alternatively, after having received some results, to change the category through changing the tab, then clicking search again. But tabs beneath search bars usually (e.g. on Google Search) change the search results immediately. Thus our intended interaction broke the established interaction pattern. 
  - Solution: Do a new search on every tab change. Additional benefit: The user has to do one click fewer.
- No search results without a search string: This was intentional, as it's not clear what the search should output when no search term is given. Search engines such as DuckDuckGo and Google also don't show any results in this case.
  - Solution: Change nothing.

#### Actual bugs

- No bottom border on the service name field: The cause of ths bug hasn't been found yet.
  - Solution: ???
- The search result links didn't work because the frontend expected the search links to include ids and the route to the links was constructed with those ids. These ids were provided by the backend at some point but got removed during some backend changes. Thus the routes couldn't be created and the links didn't work.
  - Solution: Include the ids in the search results again.
- The route to the terms and conditions was updated at some point but updating the link on the login page was forgotten.
  - Solution: Update the link.



