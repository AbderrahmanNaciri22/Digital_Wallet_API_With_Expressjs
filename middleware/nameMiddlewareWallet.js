const { readDB, writeDB } = require("../services/db.service");
const db = readDB();
index = 0;

function nameMiddlewareWallet(req, res, next) {
     const {name} = req.body;
   const index  = db.wallets.findIndex(w => w.name === name);
        if(index !== -1){
                  return res.status(400).json({ message: "Name wallet already exist" });
        }
        next();

}

module.exports = nameMiddlewareWallet;
