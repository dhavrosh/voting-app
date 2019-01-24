import { model } from '../db';

export const getAll = async () => model.find();

export const getById = async (id: string) => model.findById(id);