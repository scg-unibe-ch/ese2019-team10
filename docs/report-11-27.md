
## Report for November 27

_Biweekly report about biggest challenges and risks, and learning outcomes_

---

We've switched the database in the backend from MySQL to PostgreSQL because Postgres was very good search functionality (case insensitive, k-nearest-neighbours-indexing, etc.). So to implement a good search, we had two options: either use a different database (such as Postgres) or use a search engine like ElasticSearch. But the latter would have been a bit disproportionate to the scale of the project, so we decided to switch the database to Postgres.






