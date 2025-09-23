//(type nul > index.html) & (type nul > mimipro.html) & (type nul > hello.html)

const express = require("express");
const app = express();


// app.use((req, res, next) => {
//      console.log("aaaaaaa is  working");
//     return next();
// });

// app.use((req, res, next) => {
//      console.log(req.method,express.request.hostname,req.path);
//     return next();
// });

//Loger--
const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveme") {
        next();
    }
    res.send("Enter the passkey till");
};

app.get("/api", checkToken, (req, res) => {
     res.send("bbbbbb is  working");
});

app.get("/api", (req, res) => {
     res.send("DDDDD is  working");
});

// app.use("/random", (req, res) => {
//      res.send("cccc is  working");
// });

// app.use("/random/id", (req, res) => {
//      res.send("dddd is  working");
// });

app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});

