const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

module.exports = [
  {
    "_id": new objectId('65b2514b4e364e8511f1fdaf'),
    "name": "müşteri anketi ",
    "selections": [
      {
        "name": "Bölüm 1",
        "questions": [
          {
            "question": "Cinsiyetiniz nedir?",
            "choices": [
              {
                "choice": "Erkek",
                "point": 10,
                "is_removed": false,
                "_id": new objectId('65b2514b4e364e8511f1fdb2')
              },
              {
                "choice": "Kadın",
                "point": 10,
                "is_removed": false,
                "_id": new objectId('65b2514b4e364e8511f1fdb3')
              }
            ],
            "is_removed": false,
            "_id": new objectId('65b2514b4e364e8511f1fdb1')
          },
          {
            "question": "Yaş aralığınız nedir?",
            "choices": [
              {
                "choice": "0-18",
                "point": 5,
                "is_removed": false,
                "_id": new objectId('65b2514b4e364e8511f1fdb5')
              },
              {
                "choice": "19-24",
                "point": 10,
                "is_removed": false,
                "_id": new objectId('65b2514b4e364e8511f1fdb6')
              },
              {
                "choice": "25+",
                "point": 20,
                "is_removed": false,
                "_id": new objectId('65b2514b4e364e8511f1fdb7')
              }
            ],
            "is_removed": false,
            "_id": new objectId('65b2514b4e364e8511f1fdb4')
          },
          {
            "question": "Nerede yaşıyorsunuz?",
            "choices": [
              {
                "choice": "Türkiye",
                "point": 30,
                "is_removed": false,
                "_id": new objectId('65b2514b4e364e8511f1fdb9')
              },
              {
                "choice": "Yurtdışı",
                "point": 10,
                "is_removed": false,
                "_id": new objectId('65b2514b4e364e8511f1fdba')
              }
            ],
            "is_removed": false,
            "_id": new objectId('65b2514b4e364e8511f1fdb8')
          }
        ],
        "is_removed": false,
        "_id": new objectId('65b2514b4e364e8511f1fdb0')
      }
    ],
    "is_removed": false,
    "__v": 0
  }
];