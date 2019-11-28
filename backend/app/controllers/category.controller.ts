import {Router, Request, Response} from 'express';
import {Category} from '../models/category.model';

const router: Router = Router();
router.get('/list', async (req: Request, res: Response) => {
  Category.all().then((categories) => {
    if (!categories) {
      res.status(500).json({msg: 'no categories found'});
    } else {
      res.status(200).json(categories);
    }
  });
});

export const CategoryController = router;
