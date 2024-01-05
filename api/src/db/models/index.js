import fs from 'fs';
import path from 'path';
const basename = path.basename(__filename);

export default (db) => {
  fs.readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js');
    }).forEach((file) => {
      const filename = file.split('.')[ 0 ];
      db.model(filename, require(__dirname + '/' + file));
    });
  return db;
};
