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

    const id = parseInt(req.params.id);
    if(isNaN(id)){
     return   res.status(400).json("id required");
    };

    const user = db.users.find(u=>u.id ===id);
     if (!user)
        return res.status(400).json("user not found")

    return res.status(200).json(user);

};
exports.updateUser = (req,res)=>{
    const id = parseInt(req.params.id);
    // const users = readDB();
    const { name, email, phone } = req.body;

    if(isNaN(id)){
       return   res.status(400).json("id required");
    }
    const index = db.users.findIndex(u => u.id === id);

    if(index === -1){
         return   res.status(404).json("id not found");
    }

    user = db.users[index];
    user.name = name;
    user.email = email;
    user.phone = phone;
    res.send(user);
        

    };


exports.deleteUser = (req,res)=>{
    const id = parseInt(req.params.id);
    const index = db.users.findIndex(u => u.id === id);
    if(isNaN(id))
        return res.status(400).json("id required");

    const user = db.users.find(u=>u.id === id);

    if(!user)
        return res.status(400).json("user not found");

    db.users.splice(index,1);
    writeDB(db);
    return res.status(200).json("user delete successfuly");


}