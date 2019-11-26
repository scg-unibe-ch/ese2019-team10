
## Report for November 27

_Biweekly report about biggest challenges and risks, and learning outcomes_

---

We've switched the database in the backend from MySQL to PostgreSQL because Postgres was very good search functionality (case insensitive, k-nearest-neighbours-indexing, etc.). So to implement a good search, we had two options: either use a different database (such as Postgres) or use a search engine like ElasticSearch. But the latter would have been a bit disproportionate to the scale of the project, so we decided to switch the database to Postgres.

We've implemented a search where you can specify whether you want to search everything, or only either services, or events, or users, or only specific attribute of services, events, or users, such as a user name or a service description. An open question we have is whether the search should happen as a post request with a json object or a get request with url parameters.




