const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const authMiddleware = require("../middleware/emailMiddleware");


router.post("/",authMiddleware, controller.createUser);
router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;