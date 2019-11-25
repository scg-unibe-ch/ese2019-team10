import {Request, Response, Router} from 'express';
import {User} from '../models/user.model';
import {Service} from '../models/service.model';
import {Event} from '../models/event.model';
import { Op } from 'sequelize';
import {sequelize} from '../server';

const router: Router = Router();

/**
 * The result of a search, will be converted into a JSON string to be returned in a response.
 */
class SearchResult {
  private services: any[] = [];
  private events: any[] = [];
  private users: any[] = [];

  addServices(services: any[]): void {
    services.forEach( (service) => {
      this.services.push(service);
    });
  }

  addEvents(events: any[]): void {
    events.forEach( (event) => {
      this.events.push(event);
    });
  }

  addUsers(users: any[]): void {
    users.forEach( (user) => {
      this.users.push(user);
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
  const sqlQuery = 'SELECT u."id", u."firstName", u."lastName", u."city", u."country" FROM "User" AS u WHERE ' +
    'to_tsvector(u."firstName" || \' \' || u."lastName") @@ plainto_tsquery(\'english\', :searchTerm)';

  const queryResult = await sequelize.query(
    sqlQuery,
    {
      replacements: {'searchTerm': searchTerm},
    }
  );

  result.addUsers(queryResult[0]);
}

/**
 * Search a service with description or name containing a given string, case insensitive.
 *
 * @param searchTerm string that name or description should contain
 * @param result pointer to a SearchResult instance to store results
 */
async function searchService(searchTerm: string, result: SearchResult) {
  const sqlQuery = 'SELECT * FROM "Service" AS s WHERE to_tsvector(s."name" || \' \' || s."description") ' +
    '@@ plainto_tsquery(\'english\', :searchTerm)';

  const queryResult = await sequelize.query(
    sqlQuery,
    {
      replacements: {'searchTerm': searchTerm},
    }
  );

  result.addServices(queryResult[0]);
}

/**
 * Search an event with description or name containing a given string, case insensitive.
 *
 * @param searchTerm string that name or description should contain
 * @param result pointer to a SearchResult instance to store results
 */
async function searchEvent(searchTerm: string, result: SearchResult) {
  const sqlQuery = 'SELECT * FROM "Event" AS e WHERE to_tsvector(e."name" || \' \' || e."description") ' +
                   '@@ plainto_tsquery(\'english\', :searchTerm)';

  const queryResult = await sequelize.query(
    sqlQuery,
    {
      replacements: {'searchTerm': searchTerm},
    }
  );

  result.addEvents(queryResult[0]);
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
    this.searchTerm = searchParameter['searchTerm'];
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

router.get('/', async (req: Request, res: Response) => {
  try {
    const search: Search = new Search(req.body);
    let results!: SearchResult;

    res.statusCode = 200;
    results = await search.getResults();
    res.send(results.String());
  } catch (e) {
    console.log(e);
    res.statusMessage = e.message;
    res.sendStatus(500);
  }
});

export const SearchController: Router = router;
