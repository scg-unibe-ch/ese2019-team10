# Back-End Scaffolding


## Setup
If you want to run the backend without running the frontend, you can do this with `docker-compose` too. Just navigate into the root of the repo folder and run `docker-compose up --build`. This will set up three docker containers:
- A webserver, serving the REST API (this will listen on `localhost:3000`)
- The database (only reachable from inside the docker network)
- pgadmin (listening on `localhost:8081`) with default credentials admin@mail.com:admin
