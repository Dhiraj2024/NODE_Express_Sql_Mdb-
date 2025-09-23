//(type nul > index.html) & (type nul > mimipro.html) & (type nul > hello.html)

const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
// app.use((req, res, next) => {
//      console.log("aaaaaaa is  working");
//     return next();
// });

// app.use((req, res, next) => {
//      console.log(req.method,express.request.hostname,req.path);
//     return next();
// });


const checkToken = (req, res, next) => {
    let { token } = req.query;
    if (token === "giveme") {
        next();
    }
    throw new ExpressError(401, "ACCESS DENYED");
};

app.get("/api", checkToken, (req, res) => {
     res.send("path is  working");
});

app.use("/random", (req, res) => {
     res.send("cccccccccccc is  working");
});

app.use("/err", (req, res) => {
    abcd = abcd;
});
//Loger--
app.use((err ,req, res, next) => {
    let {status= 89 , message } = err;
 res.status(status).send(message);
  // console.log("-------errrorrrrr---------");
  // res.send(err);
   //next(err);
});
// app.use((err ,req, res, next) => {
//    console.log("-------22errrorrrrr---------");
//         next(err);
// });


// app.use("/api", (req, res) => {
//      res.send("bbbbbb is  working");
// });

// app.use("/api", (req, res) => {
//      res.send("DDDDD is  working");
// });

// app.use("/random", (req, res) => {
//      res.send("cccc is  working");
// });

// app.use("/random/id", (req, res) => {
//      res.send("dddd is  working");
// });

app.listen(8090, () => {
    console.log(`app is listening on port 8090`);
});






