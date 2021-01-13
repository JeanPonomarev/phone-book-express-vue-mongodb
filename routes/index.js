var express = require('express');
var router = express.Router();

  if (!contact.phoneNumber) {
    res.status(400);

    res.send({
      success: false,
      message: "Phone number field is absent in the request"
    });

    return;
  }

  contact.createdAt = new Date();

  const contacts = await loadContactsCollection();
  await contacts.insertOne(contact);

  res.status(201).send({
    success: true
  });
});

router.post("/api/deleteContact", async (req, res) => {
  const contacts = await loadContactsCollection();

  const id = req.body._id;

  await contacts.deleteOne({
    _id: new mongodb.ObjectID(id)
  });

  res.status(200);
  res.send({
    success: true,
    message: null
  });
});

router.get('/', function (req, res, next) {
  res.render('index');
});

async function loadContactsCollection() {
  const client = await mongodb.MongoClient
      .connect("mongodb+srv://phone_book_user:01011995@phonebookcluster.e2mfn.mongodb.net/phone_book_mongodb?retryWrites=true&w=majority",
          {
            useNewUrlParser: true
          });

  return client.db("phone_book_mongodb").collection("contacts");
}

module.exports = router;