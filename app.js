const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axois = require("axios").default;
mongoose.set("strictQuery", true);
const userRoute = require("./routes/user");
const fiddleRoute = require("./routes/fiddle");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/fiddles", fiddleRoute);

app.post("/execute", (req, res) => {
  let reqObj = req.body;
  reqObj["clientId"] = "ac6c75948e08b0057b5d858fad438ae5";
  reqObj["clientSecret"] =
    "d7bb10a84b293f379376bc0673df0be364453afb389dd415276366e82fcb4b0b";
  axois
    .post("https://api.jdoodle.com/v1/execute", reqObj)
    .then((resp) => {
      res.json({ error: false, response: resp.data });
    })
    .catch((err) => {
      console.log(err);
    });
});

mongoose
  .connect(
    "mongodb+srv://narendra:narendra@cluster0.12sjl.mongodb.net/Onlineplatform?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("server is running in port 3000");
});
