import { Request, Response } from 'express';

import { model } from '../db';

export const getAll = async (_: Request, res: Response) => {
  try {
    const data = await model.find();

    res.json(data);
  } catch (e) {
    res.status(500);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await model.findById(id);

    res.json(data);
  } catch (e) {
    res.status(500);
  }
};