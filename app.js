const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const users = [];

//HTTP METHODS
//GET - Retrive Data
app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/create", (req, res) => {
  if (users.length == 0) {
    res.status(404).send("No users found");
    return;
  }
  res.status(200).send(users);
});
//Post - Create Data
app.post("/create", (req, res) => {
    const user = req.body ;
    const findUser = users.find((u) => u.id === user.id)
    if (findUser){
        res.status(400).send("User already exists");
        return;
    }
    users.push(user);
    res.status(201).send("User Created Succesfully");    
});

//Delete - Delete Data
app.delete("/create/:id" , (req , res ) => {
    const {id} = req.params ;
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        res.status(404).send("User not found");
        return;
    }
    users.splice(index, 1);
    res.status(200).send("User deleted");
    return;
})

app.listen(port, console.log("http://localhost:3000"));
