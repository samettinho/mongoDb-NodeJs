const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

module.exports = [
  {
    "_id": new objectId('65950c9416fd02529779fca8'),
    "name": "samet",
    "surname": "yilmaz",
    "email": "samet@gmail.com",
    "password": "bc2b2bf60e58513241322821f0baf3b8",
    "tasks": [
      {
        "title": "sametsamet",
        "statement": "wewrtyuyıuıyt",
        "score": 1
      },
      {
        "title": "asfasdasasd1",
        "statement": "sdfsdfsdfwf2",
        "score": 100
      },
      {
        "title": "fener",
        "statement": "samet samet",
        "score": 200
      },
      {
        "title": "bahce ",
        "statement": "samet samet",
        "score": 300
      },
      {
        "title": "fener",
        "statement": "samet samet",
        "score": 150
      },
      {
        "title": "bahce ",
        "statement": "samet samet",
        "score": 1000
      }
    ],
    "is_removed": false,
    "company_id": new objectId('65956ffc16fd02529779fcc5'),
    "department_id": new objectId('65956ffc16fd02529779fcc5'),
    "__v": 0,
    "no": 3
  }
];