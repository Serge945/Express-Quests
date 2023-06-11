const database = require("./database");

const getUsers = (req, res) => {
  database
    .query("SELECT * FROM users")
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// const getUserById = (req , res) =>{
//     const id = parseInt(req.params.id)

// const getUserById = (req , res) =>{
//     const id = parseInt(req.params.id)

//     database

//   .query("SELECT * FROM users where id = ? ," ([]))
//   .then(([users])=> {
//     if(users[0] !== null){
//         res.json(users[0]);
//     }else {
//         res.status(404).send("not found")
//     }
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send("Error retrieving data from database");
//       });
//     }
// }



const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("SELECT * FROM users WHERE id = ?", [id])
    .then(([users]) => {
      if (users.length > 0) {
        res.json(users[0]);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const postUser = (req,res)=>{
  const { firstname, lastname, email, city, language, hashedPassword } = req.body;

  database
  .query(
    "INSERT INTO users (firstname, lastname, email, city, language, hashedPassword) VALUES (?, ?, ?, ?, ?, ?)",
    [firstname, lastname, email, city, language, hashedPassword]
  )
  .then(([result]) => {
    res.status(201).send("User created successfully");
  })
  .catch((err) => {
    console.error(err);
    res.status(500).send("Error creating the user");
  });
};


const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ?, language = ? WHERE id = ?",
      [firstname, lastname, email, city, language, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error editing the user");
    });
};
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting the user");
    });
};


module.exports = {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  deleteUser
};
