import {Router, Request, Response} from 'express';
import {TodoList} from '../models/todolist.model';

const router: Router = Router();
router.get('/', async (req: Request, res: Response) => {
  const instances = await TodoList.findAll();
  res.statusCode = 200;
  res.send(instances.map(e => e.toSimplification()));
});
router.post('/', async (req: Request, res: Response) => {
  const instance = new TodoList();
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 201;
  res.send(instance.toSimplification());
});
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await TodoList.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  res.statusCode = 200;
  res.send(instance.toSimplification());
});
router.put('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await TodoList.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.save();
  res.statusCode = 200;
  res.send(instance.toSimplification());
});
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const instance = await TodoList.findById(id);
  if (instance == null) {
    res.statusCode = 404;
    res.json({
      'message': 'not found'
    });
    return;
  }
  instance.fromSimplification(req.body);
  await instance.destroy();
  res.statusCode = 204;
  res.send();
});

export const TodoListController: Router = router;
