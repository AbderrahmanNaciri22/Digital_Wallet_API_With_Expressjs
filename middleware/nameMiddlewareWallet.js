const { readDB, writeDB } = require("../services/db.service");
const db = readDB();
index = 0;

function nameMiddlewareWallet(req, res, next) {
     const {name,user_id} = req.body;
     if(!name || !user_id){
          return res.status(400).json("name and user id is required");
     }
   const index  = db.wallets.findIndex(w => w.name === name);
        if(index !== -1){
                  return res.status(409).json({ message: "Name wallet already exist" });
        }
        next();

}

module.exports = nameMiddlewareWallet;
