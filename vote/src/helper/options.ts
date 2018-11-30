import { HelperOptions } from 'handlebars';

const getOptions = (options: HelperOptions) => options.fn([
  {
    label: 'Cat',
    value: 'cat',
  },
  {
    label: 'Dog',
    value: 'dog',
  },
]);

export default getOptions;
