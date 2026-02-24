const { readDB, writeDB } = require("../services/db.service");
const db = readDB();
index = 0;

function userMiddlewareWallet(req, res, next) {
     const {name,user_id} = req.body;
   const index  = db.users.findIndex(u => u.id == user_id);
        if(index == -1){
                  return res.status(400).json({ message: "User is not exist" });
        }
        next();

}

module.exports = userMiddlewareWallet;
