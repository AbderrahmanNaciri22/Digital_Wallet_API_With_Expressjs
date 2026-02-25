const { readDB, writeDB } = require("../services/db.service");
const db = readDB();
index = 0;

function userMiddlewareWallet(req, res, next) {
     const {name,user_id} = req.body;
     if(!name || !user_id){
          return res.status(400).json("name and user id is required");
     }
   const index  = db.users.findIndex(u => u.id == user_id);
        if(index == -1){
                  return res.status(404).json({ message: "User is not exist" });
        }
        next();

}

module.exports = userMiddlewareWallet;
