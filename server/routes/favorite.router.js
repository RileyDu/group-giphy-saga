const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// return all favorite images TESTED IN POSTMAN --ANDREWS'S FAVLIST USEEFFECT
router.get("/", (req, res) => {
  const queryText = `
    SELECT * FROM "favorites";
  `;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in GET /api/favorites", err);
      res.sendStatus(500);
    });
});

//RETURN THE FILTERED CATEGORY --Andrew's filter GET to display a selected categories GIFs
router.get("/", (req, res) => {
  const queryText = `
    SELECT * FROM "favorites"
    JOIN "categories" on "favorites"."category_id"="categories"."id"
    WHERE id=$1;
  `;
  pool.query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error in GET /api/favorites", err);
      res.sendStatus(500);
    });
});

// add a new favorite TESTED IN POSTMAN --SEID'S FAV BUTTON IN SEARCH VIEW
router.post("/", (req, res) => {
  const newFav = req.body;
  const queryText = `
    INSERT INTO "favorites"
      ("gif_url")
      VALUES
      ($1);
  `;
  const queryValues = [newFav.gif_url];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in POST /api/favorites", err);
      res.sendStatus(500);
    });
});

// update a favorite's associated category --ANDREW'S CATEGORIZE BUTTON ON FAVLIST
router.put("/:id", (req, res) => {
  const updatedFav = req.body;
  // req.body should contain a category_id to add to this favorite image
  const queryText = `
    UPDATE "favorites"
      SET 
        "category_id"=$1
      WHERE
        id=$2;
  `;
  const queryValues = [updatedFav.category_id, updatedFav.id];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error in PUT /api/favorites/:id", err);
      res.sendStatus(500);
    });
});

// delete a favorite THIS IS A STRETCH GOAL!!!!
router.delete("/:id", (req, res) => {
  pool
    .query('DELETE FROM "favorites" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error DELETE /api/favorites", error);
      res.sendStatus(500);
    });
});
module.exports = router;
