const express = require("express");

// database access using knex
const knex = require("../data/db-config.js"); // <<<<<< renamed to knex from db

const router = express.Router();

// return a list of posts from the database
router.get("/", (req, res) => {
  // select * from posts
  knex
    .select("*")
    .from("posts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the posts." });
    });
});

router.get("/:id", (req, res) => {
  // SELECT * FROM posts WHERE id = req.params.id
  knex
    .select("*")
    .from("posts")
    .where({ id: req.params.id })
    // optional, first() function
    .first() // equivalent to `posts[0]`
    // .where("id", "=", req.params.id) another way to do it
    // where("price", ">", 30) would have to be done like this, couldn't do it as an object
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error getting the posts." });
    });
});

router.post("/", (req, res) => {
  // INSERT into () values ()
  const postData = req.body;
  // please validate postData before calling the database
  // second argument, "id" will show a warning on console when using SQLite
  // it's there for the fture (when we move to MySQL or Postgres)
  knex("posts")
    .insert(postData, "id")
    .then(ids => {
      // returns an array of one element, the id of the last record inserted.
      const id = ids[0];

      return (
        knex("posts")
          // controlling what we see when we make a post
          .select("id", "title", "contents")
          .where({ id })
          .first()
          .then(post => {
            res.status(201).json(post);
          })
      );

      //   res.status(200).json(id);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error adding the post." });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  // validate the data
  knex("posts")
    .where({ id }) // always filter on updated and delete
    .update(changes)
    .then(count => {
      count > 0
        ? res.status(200).json({ message: `${count} record(s) updated.` })
        : res.status(404).json({ message: "Record not found. " });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error adding the post." });
    });
});

router.delete("/:id", (req, res) => {
  knex("posts")
    .where({ id: req.params.id }) // always filter on updated and delete
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted.` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Error removing the post." });
    });
});

module.exports = router;
