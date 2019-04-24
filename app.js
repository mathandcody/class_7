// DEPENDENCIES
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const Users = require("./Users");
const cors = require("cors");
const path = require("path")

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static(path.resolve(__dirname, "./client/dist/")))


// DB CONNECTION
mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true
});

// const user1 = new Users({ name: "James", email: "james@j.com", password: "1234" });
// user1.save((error, data) => {
//     if (error) {
//         console.log(error)
//     }
//     else {
//         console.log("Saved")
//     }
// })



// ROUTES
app.get("/", (req, res) => {
    // TODO SEND VUE FILE
    res.sendFile(path.resolve(__dirname, "./client/dist/index.html"))
})

app.get("/details/:name", (req, res) => {
    const name = req.params.name;
    Users.findOne({ name }, (err, data) => {
        if (err) {
            res.sendStatus(500)
        }
        else {
            res.send(data)
        }
    })
})

app.post("/details", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    
    const currentUser = new Users({ name, email, password });
    currentUser.save((err) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        else {
            res.send("Saved Succesfully");
        }
    })

});

app.put("/details/:name", (req, res) => {
    Users.findOneAndUpdate({ name: req.params.name }, { email: req.body.email }, (err) => {
        if (err) {
            console.log(err);

            res.sendStatus(500)
        }
        else {
            res.send("Updated Successfully")
        }
    })
})

app.delete("/details/:name", (req, res) => {
    Users.findOneAndDelete({ name: req.params.name }, (err) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        else {
            res.send("Deleted")
        }
    })
});

// LISTENER
app.listen(3000, () => console.log("Server Started")
)