import toPlain from './PlainFormatter.js';
import toStylish from './StylishFormatter.js';

const toString =  (comparisionResult, format) => {
  switch (format) {
    case 'stylish':
      return toStylish(comparisionResult);
    case 'plain':
      return toPlain(comparisionResult);
    default:
      throw new Error(`Format '${format}' is not supported. Possible formats: 'stylish', 'plain'`);
  }
};

export default toString;
