import { Request, Response } from 'express';

import * as controller from './controller';

export const getAll = async (_: Request, res: Response) => {
  const data = await controller.getAll();

  res.json(data);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await controller.getById(id);

  res.json(data);
};

export const renderAll = async (_: Request, res: Response) => {
  const data = await controller.getAll();

  res.render('index', { data });
};

export const renderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await controller.getById(id);

  res.render('candidate', { data });
};