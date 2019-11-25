import {Request, Response, Router} from 'express';
import {User} from '../models/user.model';
import {Service} from '../models/service.model';
import {Event} from '../models/event.model';
import { Op } from 'sequelize';

const router: Router = Router();

/**
 * The result of a search, will be converted into a JSON string to be returned in a response.
 */
class SearchResult {
  private services: Service[] = [];
  private events: Event[] = [];
  private users: any[] = [];

  addServices(services: Service[]): void {
    services.forEach( (service) => {
      this.services.push(service);
    });
  }

  addEvents(events: Event[]): void {
    events.forEach( (event) => {
      this.events.push(event);
    });
  }

  addUsers(users: User[]): void {
    users.forEach( (user) => {
      this.users.push({
        'id': user.id,
        'firstName': user.firstName,
        'lastName': user.lastName,
      });
    });
  }

  String(): string {
    return JSON.stringify(this);
  }
}

/**
 * Search a user with firstName or lastName containing a given string, case insensitive.
 *
 * @param searchTerm string that firstName or lastName should contain
 * @param result pointer to a SearchResult instance to store results
 */
async function searchUser(searchTerm: string, result: SearchResult) {
  result.addUsers(await User.findAll({
    where: {
      [Op.or]: {
        firstName: {
          [Op.iLike]: searchTerm
        },
        lastName: {
          [Op.iLike]: searchTerm
        }
      }
    }
  }));
}

/**
 * Search a service with description or name containing a given string, case insensitive.
 *
 * @param searchTerm string that name or description should contain
 * @param result pointer to a SearchResult instance to store results
 */
async function searchService(searchTerm: string, result: SearchResult) {
  result.addServices(await Service.findAll({
    where : {
      [Op.or] : {
        name: {
          [Op.iLike] : searchTerm
        },
        description : {
          [Op.iLike] : searchTerm
        }
      }
    }
  }));

  return result;
}

/**
 * Search an event with description or name containing a given string, case insensitive.
 *
 * @param searchTerm string that name or description should contain
 * @param result pointer to a SearchResult instance to store results
 */
async function searchEvent(searchTerm: string, result: SearchResult) {
  result.addEvents(await Event.findAll({
    where : {
      [Op.or] : {
        name: {
          [Op.iLike] : searchTerm
        },
        description : {
          [Op.iLike] : searchTerm
        }
      }
    }
  }));

  return result;
}

/**
 * A search in the database.
 *
 * Specifies the exact technicalities of a DB-search, including the extend of a search and how search criteria
 * are built from a given search term.
 */
class Search {
  private readonly searchFunctions!: Function[];
  private results: SearchResult = new SearchResult();
  searchTerm!: string;

  /**
   * Set up search functions and search term from given JSON.
   *
   * @param searchParameter JSON specifying the searchCategory and the searchTerm
   */
  constructor(searchParameter: any) {
    this.searchTerm = '%' + searchParameter['searchTerm'] + '%';  // '%' represents any number of characters
    switch (searchParameter['searchCategory']) {
      case 'everything' : {
        this.searchFunctions = [searchUser, searchService, searchEvent];
        break;
      }
      case 'services' : {
        this.searchFunctions = [searchService];
        break;
      }
      case 'events' : {
        this.searchFunctions = [searchEvent];
        break;
      }
      case 'user' : {
        this.searchFunctions = [searchUser];
        break;
      }
      default : {
        throw Error('No valid search type specified.');
      }
    }
  }

  /**
   * Perform search and return a Promise of a SearchResult.
   *
   * @returns Promise<SearchResult> where SearchResult contains the result of this Search
   */
  async getResults(): Promise<SearchResult> {
    let currentSearch!: Function | undefined;

    // iterate through the search functions
    while (this.searchFunctions.length > 0) {
      currentSearch = this.searchFunctions.pop();
      if (currentSearch !== undefined) {
        await currentSearch(this.searchTerm, this.results);
      }
    }

    return this.results;
  }
}

router.post('/', async (req: Request, res: Response) => {
  try {
    const search: Search = new Search(req.body);
    let results!: SearchResult;

    res.statusCode = 200;
    results = await search.getResults();
    res.send(results.String());
  } catch (e) {
    console.log(e);
    res.statusMessage = 'Invalid search type';
    res.sendStatus(500);
  }
});

export const SearchController: Router = router;
