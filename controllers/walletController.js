const { readDB, writeDB } = require("../services/db.service");
const db = readDB();
const now = new Date();

const day = String(now.getDate()).padStart(2, "0");
const month = String(now.getMonth() + 1).padStart(2, "0");
const year = now.getFullYear();

const hours = String(now.getHours()).padStart(2, "0");
const minutes = String(now.getMinutes()).padStart(2, "0");
const seconds = String(now.getSeconds()).padStart(2, "0");

const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;



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
    db.wallets.push(wallet);
    writeDB(db)
    res.send(wallet);
}

exports.getWallets = (req, res) => {

  const db = readDB();

  let { user_id, minSold, maxSold, page, limit } = req.query;

  user_id = user_id ? parseInt(user_id) : undefined;
  minSold = minSold ? parseFloat(minSold) : undefined;
  maxSold = maxSold ? parseFloat(maxSold) : undefined;

  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;

  let results = db.wallets;

  if (user_id !== undefined) {
    results = results.filter(w => w.user_id === user_id);
  }

  if (minSold !== undefined) {
    results = results.filter(w => w.sold >= minSold);
  }

  if (maxSold !== undefined) {
    results = results.filter(w => w.sold <= maxSold);
  }

  const total = results.length;
  const totalPages = Math.ceil(total / limit);

  const startIndex = (page - 1) * limit;
  const data = results.slice(startIndex, startIndex + limit);

  return res.status(200).json({data});
};

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


exports.walletAction =(req,res)=>{
     const id = parseInt(req.params.id);
     const action = req.params.action;
         const {amount} = req.body;

    index = db.wallets.findIndex(w => w.id === id );
    if(index == -1){
        return res.status(404).json("wallet id is not exist");
    }
    wallet = db.wallets[index]
    if(action == "deposit"){
            wallet.sold += amount;
            op = {
                action:"deposit",
                walletId:id,
                amount:+amount,
                date:formattedDate,
            }
            db.operations.push(op);
    }else if(action == "withdraw"){
        wallet.sold -= amount;
         op = {
                action:"withdraw",
                walletId:id,
                amount:-amount,
                date:formattedDate,
            }
            db.operations.push(op);
    }else{
        return res.status(404).json("action no valide");
    }

    writeDB(db)
    return res.status(200).json(wallet);
    
}






// exports.withdraw = (req,res) =>{
//     const id = parseInt(req.params.id);
//          const {amount} = req.body;

//      if(isNaN(id)){
//        return   res.status(400).json("id required");
//     }

//     index = db.wallets.findIndex(w => w.id === id );
//     if(index == -1){
//         return res.status(404).json("wallet id is not exist");
//     }
//     wallet = db.wallets[index]
//     wallet.sold -= amount;
//     writeDB(db)
//     return res.status(200).json(wallet);
// }