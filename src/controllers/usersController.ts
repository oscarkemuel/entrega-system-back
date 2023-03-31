import { Request, Response } from 'express';
import { UserService } from '../services/usersService';

class UserController {
  private usersService = new UserService();

  async index(_: Request, res: Response) {
    const users = await this.usersService.index();
    
    return res.json({users});
  }

  async create(req: Request, res: Response) {
    console.log('create')
    const { name, email, password } = req.body;

    const newUser = await this.usersService.create({ name, email, password });

    return res.json(newUser);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.usersService.show(id);

    return res.json(user);
  }
}

export { UserController };