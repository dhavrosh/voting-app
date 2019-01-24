import { model, Candidate } from './model';
import data from './data.json';

export const createSeed = () => Promise.all(
  (data as Array<Candidate>).map(async item => 
    model.findOneAndUpdate(
      { fullName: item.fullName }, 
      item, 
      { upsert:true }
    )
  )
);