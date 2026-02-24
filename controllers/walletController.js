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

}

exports.updateWallet = (req , res)=>{

}

exports.deleteWallet = (req , res)=>{

}