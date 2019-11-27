import {Request, Response, Router} from 'express';
import {User} from '../models/user.model';
import {Category, Service} from '../models/service.model';
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
 * Convert a table name T and column names c1,..cn to a string like 'T."c1' || \' \' || .. || \' \' || T."cn"'.
 *
 * This method is used to compose a query string.
 *
 * @param tableShortName short name for table (like 'e' for table 'Event')
 * @param columns array of column names
 */
function getSearchColumnString(tableShortName: string, columns: string[]): string {
  const tableColumns = columns.map((column) => 'coalesce(' + tableShortName + '."' + column + '", \'\')');
  return tableColumns.join(' || \' \' || ');
}

/**
 * Convert a table name T and column names c1,..cn to a string like 'T."c1', ..., T."cn"'.
 *
 * This method is used to compose a query string.
 *
 * @param tableShortName
 * @param columns
 */
function getRequestColumnString(tableShortName: string, columns: string[]): string {
  const tableColumns = columns.map((column) => tableShortName + '."' + column + '"');
  return tableColumns.join(', ');
}

/**
 * Compose an SQL query that searches (full text) gets given columns from given table where given columns match.
 *
 * Please note that these parameters MUST NOT BE USER CONTROLLED! They are not getting sanitized for the query!
 *
 * @param unsafeTableName
 * @param unsafeSearchAttributes
 * @param unsafeResultAttributes
 */
function buildSearchQuery(unsafeTableName: string, unsafeSearchAttributes: string[],
                          unsafeResultAttributes: string[]): string {
  const tableShortName = unsafeTableName.charAt(0).toLowerCase();
  const searchColumnString = getSearchColumnString(tableShortName, unsafeSearchAttributes);
  const requestColumnString = getRequestColumnString(tableShortName, unsafeResultAttributes);

  return 'SELECT ' + requestColumnString + ' FROM "' + unsafeTableName + '" AS ' + tableShortName + ' WHERE ' +
    'to_tsvector(' + searchColumnString + ') @@ plainto_tsquery(\'english\', :searchTerm)';
}

/**
 * Search a user with firstName or lastName containing a given string, case insensitive.
 *
 * @param searchTerm string that firstName or lastName should contain
 * @param searchAttribute the attribute/column name to search
 * @param result pointer to a SearchResult instance to store results
 */
async function searchUser(searchTerm: string, searchAttribute: string, result: SearchResult) {
  const attributes: {[key: string]: string[]} = {
    'everything': ['firstName', 'lastName', 'city', 'country'],
    'firstName': ['firstName'],
    'lastName': ['lastName'],
    'city': ['city'],
    'country': ['country'],
  };

  const sqlQuery = buildSearchQuery('User', attributes[searchAttribute],
    attributes['everything']);

  const queryResult = await sequelize.query(
    sqlQuery,
    {
      replacements: {'searchTerm': searchTerm}
    }
  );

  result.addUsers(queryResult[0]);
}

/**
 * Search a service with description or name containing a given string, case insensitive.
 *
 * @param searchTerm string that name or description should contain
 * @param searchAttribute the attribute/column name to search
 * @param result pointer to a SearchResult instance to store results
 */
async function searchService(searchTerm: string, searchAttribute: string, result: SearchResult) {
  const attributes: {[key: string]: string[]} = {
    'everything': ['name', 'description', 'price', 'availability', 'place', 'quantity'],
    'name': ['name'],
    'category': ['categoryId'],
    'description': ['description'],
    'price': ['price'],
    'availability': ['availability'],
    'place': ['place'],
    'quantity': ['quantity'],
  };

  // this is ad-hoc and should be improved later
  if (searchAttribute === 'category') {
    // search a category with the given search term as name
    await Category.find({where: {'name': searchTerm}}).then( (category) => {
      if (category) {
        // if found, search a service with the categoryId set to the id of the this category
        Service.find({where: {'categoryId': category.id}}).then((service) => {
          if (service) {
            result.addServices([service]);
          }
        });
      }
    });

    return;
  }

  const sqlQuery = buildSearchQuery('Service', attributes[searchAttribute],
    attributes['everything']);

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
 * @param searchAttribute the attribute/column name to search
 * @param result pointer to a SearchResult instance to store results
 */
async function searchEvent(searchTerm: string, searchAttribute: string, result: SearchResult) {
  const attributes: {[key: string]: string[]} = {
    'everything': ['name', 'description', 'date', 'place'],
    'name': ['name'],
    'description': ['description'],
    'date': ['date'],
    'place': ['place'],
  };

  const sqlQuery = buildSearchQuery('Event', attributes[searchAttribute],
    attributes['everything']);

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
  private searchAttribute!: string;
  searchTerm!: string;

  /**
   * Set up search functions and search term from given JSON.
   *
   * @param searchParameter JSON specifying the searchCategory and the searchTerm
   */
  constructor(searchParameter: any) {
    this.searchTerm = searchParameter['searchTerm'];
    this.searchAttribute = searchParameter['searchAttribute'];

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
        await currentSearch(this.searchTerm, this.searchAttribute, this.results);
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
    res.statusMessage = e.message;
    res.sendStatus(500);
  }
});

export const SearchController: Router = router;
