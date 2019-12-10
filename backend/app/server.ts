/* import everything from express and assign it to the express variable */
import express from 'express';

// import all the controllers. If you add a new controller, make sure to import it here as well.
import {Sequelize} from 'sequelize-typescript';
import {Service} from './models/service.model';
import {User} from './models/user.model';
import {Event} from './models/event.model';
import {City} from './models/city.model';
import {Country} from './models/country.model';
import {Category} from './models/category.model';
import {EventUser} from './models/EventUser';
import {EventService} from './models/EventService';
import {RegisterController} from './controllers';
import {LoginController} from './controllers';
import {CheckLoginController} from './controllers/checkLogin.controller';
import {UserController} from './controllers';
import {Role} from './models/role.model';
import {RoleUser} from './models/RoleUser';
import {AdminController} from './controllers/admin.controller';
import {CheckAdminController} from './controllers/checkAdmin.controller.';
import {SearchController} from './controllers/search.controller';
import {CategoryController} from './controllers/category.controller';
import {ServiceController} from './controllers/service.controller';

/**
 * Create required roles if they don't exist yet
 */
function createRoles() {
  // For each string in this array, a role with this name will exist in the table
  const roleArray: string[] = ['Admin', 'ServiceProvider', 'EventManager'];

  roleArray.forEach((roleName) => {
    const instance: Role = new Role();
    instance.createIfNotExits(roleName);
  });
}

/**
 * Create an admin-account.
 */
function createAdmin() {
  User.findOne({where: {'email': 'admin@mail.com'}}).then(result => {
    if (result === null) {
      const admin: User = new User();
      admin.post_({
        'firstName': 'admin',
        'lastName': 'admin',
        'street': 'some_address',
        'password': 'xugai4nie9ief5AhshaiSh1aequaiy',
        'email': 'admin@mail.com'
      });
      admin.save().then(adminInstance => {
        adminInstance.update({approved: true}).then(updatedAdmin => {console.log('admin approved'); });
        Role.findOne({where: {'name': 'Admin'}}).then(adminRoleInstance => {
          if (adminRoleInstance != null) {
            adminInstance.$add('role', [adminRoleInstance])
              .then(savedAdmin => {
                console.log('admin role assigned to admin user'); })
              .catch( savedAdmin => {
                console.log('could not assign admin role to admin user');
              });
          } else {
            throw Error('admin role not found!');
          }
        });
      });
    }
  });
}

/**
 * Create required categories if they don't exist yet
 */
function createCategories() {
  // For each string in this array, a role with this name will exist in the table
  const categoriesArray: string[] = ['Professional', 'Venue', 'Objects', 'Consumables'];

  categoriesArray.forEach((categorieName) => {
    const instance: Category = new Category();
    instance.createIfNotExits(categorieName);
  });
}

export const sequelize =  new Sequelize({
  database: 'app_db',
  host: 'database',
  dialect: 'postgres',
  username: 'root',
  password: 'admin',
  define: {
    engine: 'innoDB',
    charset: 'utf8',
    collate: 'utf8_unicode_ci'
  }
});
sequelize.addModels([Service, User, Event, City, Country,
  EventUser, Role, RoleUser, EventService, Category]);

// create a new express application instance
const app: express.Application = express();
app.use(express.json());

// define the port the express app will listen on
const port = 3000;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization, auth, Authorization');
  next();
});

// api/register endpoint
app.use('/api/register', RegisterController);
app.use('/api/login', LoginController);
app.use('/api/admin', CheckLoginController, CheckAdminController, AdminController);
app.use('/api/user', CheckLoginController, UserController);
app.use('/api/search', SearchController);
app.use('/api/category', CategoryController);
app.use('/api/user/service', CheckLoginController, ServiceController);

// .sync() is not recommended for production, yes, but I use it for development!
sequelize.sync().then(() => {
// start serving the application on the given port
  createRoles();
  createAdmin();
  createCategories();
  app.listen(port, () => {
    // success callback, log something to console as soon as the application has started
    console.log(`Listening at http://localhost:${port}/`);
  });
});
