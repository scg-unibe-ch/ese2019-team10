/* import everything from express and assign it to the express variable */
import express from 'express';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {Sequelize} from 'sequelize-typescript';
import {WelcomeController} from './controllers';
import {Service} from './models/service.model';
import {User} from './models/user.model';
import {Event} from './models/event.model';
import {City} from './models/city.model';
import {Country} from './models/country.model';
import {EventUser} from './models/EventUser';
import {ServiceUser} from './models/ServiceUser';
import {RegisterController} from './controllers';
import {LoginController} from './controllers';
import {AccessController} from './controllers/access.controller';

const sequelize =  new Sequelize({
  database: 'app_db',
  host: 'app-database',
  dialect: 'mysql',
  username: 'root',
  password: 'admin',
  define: {
    engine: 'innoDB',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }
});
sequelize.addModels([Service, User, Event, City, Country, ServiceUser, EventUser]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());

// define the port the express app will listen on
const port = 3000;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/welcome', AccessController, WelcomeController);
// api/register endpoint
app.use('/api/register', RegisterController);
app.use('/api/login', LoginController);

// .sync() is not recommended for production, yes, but I use it for development!
sequelize.sync().then(() => {
// start serving the application on the given port
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
