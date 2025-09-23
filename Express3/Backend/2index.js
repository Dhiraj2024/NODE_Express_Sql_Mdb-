const express = require("express");

const app = express();
const port = 8090;

app.use( express.urlencoded({extended: true}));
app.use(express.json());
app.get("/register", (req,res) => {
    let {user , password} = req.query;
    res.send(`standard GET responses ,your {${user}} password is {${password}}`);
});

app.post("/register", (req,res) => {
    let {user , password} = req.body;
    res.send(`standard POST responses :user is{${user}} password {${password}}`);
}); 

app.listen(port, () => {
    console.log(`app is listning on port ${port}`);
});