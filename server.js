const express = require("express");
const app = express();
app.use(express.json());

app.use(express.json());

app.use("/users", require("./routes/userRoute"));
app.use("/wallets", require("./routes/walletRoute"));

// app.use(require("./middleware/error.middleware"));

app.listen(3000);