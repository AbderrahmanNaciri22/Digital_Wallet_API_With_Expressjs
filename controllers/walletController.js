const { readDB, writeDB } = require("../services/db.service");
const db = readDB();


exports.createWallet = (req , res)=>{
    if (!req.body)
              return res.status(400).json({ message: "Body is required" });

    const {user_id,name} = req.body;

    wallet ={
        id : db.wallets.length +1,
        user_id,
        name,
        sold:0,
    }
    console.log("Body:", req.body);
    db.wallets.push(wallet);
    writeDB(db)
    res.send(wallet);
}

exports.getWallets = (req,res)=>{
    res.send(db.wallets);
}

exports.getWalletById = (req , res)=>{
          const id = parseInt(req.params.id);
              if(isNaN(id)){
                return   res.status(400).json("id required");
             };
      wallet = db.wallets.find(u=>u.id == id);
     if (!wallet)
        return res.status(400).json("wallet not found")

     res.send(wallet);
    
}

exports.updateWallet = (req , res)=>{
        const id = parseInt(req.params.id);
        const { user_id, name, sold } = req.body;
        
    if(isNaN(id)){
       return   res.status(400).json("id required");
    }
    index = db.wallets.findIndex(u => u.id === id);
    wallet = db.wallets[index];
    wallet.name = name;
    wallet.user_id = user_id;
    wallet.sold = sold;

    writeDB(db);
    res.send(wallet)

}

exports.deleteWallet = (req , res)=>{
     const id = parseInt(req.params.id);
     if(isNaN(id)){
       return   res.status(400).json("id required");
    }
    index = db.wallets.findIndex(u => u.id === id);
    db.wallets.splice(index,1);
    writeDB(db);
    return res.status(200).json("wallet delete successfuly");



}