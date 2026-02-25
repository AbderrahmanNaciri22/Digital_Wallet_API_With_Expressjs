const { readDB, writeDB } = require("../services/db.service");
const db = readDB();
index = 0;

function validateUser(req, res, next) {
     const {name , user_id,email,phone} = req.body;
     if(!name || !user_id || !email || !phone){
          return res.status(400).json("name and user id and email and phone is required");
     }
   const index  = db.users.findIndex(u => u.email === email);
        if(index !== -1){
                  return res.status(409).json({ message: "Email already exist" });
        }
        next();

}

module.exports = validateUser;
