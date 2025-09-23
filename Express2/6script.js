const express = require("express");
const app = express();
const path = require("path");
let port = 8090;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");  // ⚡ "view-engine" nahi, "view engine"
app.set("views", path.join(__dirname, "views"));  // ✅ sahi function join()

app.get("/ig/:username", (req, res) => {
    let { username } = req.params;
    const instaData = require("./data.json");
    const data = instaData[username];
    
    if (data) {
        res.render("database.ejs", { data });
    } else {
        res.render("error.ejs");
    }
});

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
