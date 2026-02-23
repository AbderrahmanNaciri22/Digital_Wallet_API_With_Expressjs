const { readDB, writeDB } = require("../services/db.service");
const db = readDB();


exports.createUser = (req,res)=>{
        if (!req.body)
              return res.status(400).json({ message: "Body is required" });
    
     const { name, email, phone } = req.body;
     user = {
        id :db.users.length + 1, 
        name,
        email,
        phone,
     }
      db.users.push(user);
      writeDB(db);
      return res.status(201).json(user);
}
exports.getUsers = (req,res)=>{
    // res.send(db.users);
    return res.status(200).json(db.users);

}
exports.getUserById = (req,res)=>{

};
exports.updateUser = (req,res)=>{
    

}
exports.deleteUser = (req,res)=>{

}