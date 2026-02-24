const { readDB, writeDB } = require("../services/db.service");
const db = readDB();
index = 0;

function validateUser(req, res, next) {
     const {email} = req.body;
   const index  = db.users.findIndex(u => u.email === email);
        if(index !== -1){
                  return res.status(400).json({ message: "Email already exist" });
        }
        next();

}

module.exports = validateUser;
