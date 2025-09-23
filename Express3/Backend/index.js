const express = require("express");

const app = express();
const port = 8090;

app.get("/register", (req,res) => {
    let {user , password} = req.query;
    res.send(`standard GET responses ,your {${user}} password is {${password}}`);
});

app.post("/register", (req,res) => {
    res.send("standard POST responses");
});

app.listen(port, () => {
    console.log(`app is listning on port ${port}`);
});
