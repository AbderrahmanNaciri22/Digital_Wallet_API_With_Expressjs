const express = require('express');
const router = express.Router();
const controller = require("../controllers/walletController");
const nameMiddlewareWallet  = require("../middleware/nameMiddlewareWallet");



router.post("/",nameMiddlewareWallet, controller.createWallet);
router.get("/", controller.getWallets);
router.get("/:id", controller.getWalletById);
router.put("/:id", controller.updateWallet);
router.delete("/:id", controller.deleteWallet);

module.exports = router;