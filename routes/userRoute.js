const express = require('express');
const router = express.Router();
const controller = require("../controllers/userController");
const validateUser  = require("../middleware/emailMiddleware");


router.post("/",validateUser , controller.createUser);
router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.put("/:id", controller.updateUser);
router.delete("/:id", controller.deleteUser);

module.exports = router;