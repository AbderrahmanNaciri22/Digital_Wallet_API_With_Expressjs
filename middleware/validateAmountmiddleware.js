const { readDB, writeDB } = require("../services/db.service");
const db = readDB();
index = 0;

function validateMiddlewareWallet(req, res, next) {
         const id = parseInt(req.params.id);
         const action = req.params.action;

         const {amount} = req.body;

        if(isNaN(id)){
        return   res.status(400).json("id required");
        }
 
        index = db.wallets.findIndex(w => w.id === id );
        if(index == -1){
            return res.status(404).json("wallet id is not exist");
        }
         wallet = db.wallets[index];
       
        if(action == "withdraw"){
            if(wallet.sold < amount){
                return res.status(404).json("Money in wallet is not enough")
            }
        }
    next();

}

module.exports = validateMiddlewareWallet;
