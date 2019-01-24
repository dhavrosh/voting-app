require('./model');

import mongoose = require('mongoose');
import { createSeed } from './seed';

mongoose.Promise = global.Promise;

export const connect = (url: string, callback: () => void) =>
  mongoose.connect(url, async err => {

    if (err) {
      console.error('Couldn\'t connect to MongoDB', err);
      process.exit(1);
    }

    await createSeed();

    console.log('Seed successfully was created');

    callback();
  });
