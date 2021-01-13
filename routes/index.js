const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

router.get("/api/getContacts", async (req, res) => {
  const term = (req.query.term || "");

  const contacts = await loadContactsCollection();

  const query = {
    $or: [
      {
        name: term
      },
      {
        surname: term
      },
      {
        phoneNumber: term
      }
    ]
  };

  if (term.length === 0) {
    res.send(await contacts.find({}).toArray());
  } else {
    res.send(await contacts.find(query).toArray());
  }
});

router.post("/api/addContact", async (req, res) => {
  let contact = req.body.contact;

  if (!contact) {
    res.status(400);

    res.send({
      success: false,
      message: "Wrong data in the request"
    });

    return;
  }

  if (!contact.name) {
    res.status(400);

    res.send({
      success: false,
      message: "Name field is absent in the request"
    });

    return;
  }

  if (!contact.surname) {
    res.status(400);

    res.send({
      success: false,
      message: "Surname field is absent in the request"
    });

    return;
  }

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