const express = require('express');
const { getUsers, createUser, getUserById, deleteUser, activateUserAccount } = require('../controllers/usersController');
const upload = require('../middlewares/uploadFile');
const validateUserRegistration = require('../validators/auth');
const { runValidation } = require('../validators');
const router = express.Router()
router.get("/", getUsers);
router.post("/create", upload.single("image") , validateUserRegistration, runValidation, createUser)
router.get("/:id", getUserById)
router.delete("/:id", deleteUser)
router.post("/verify", activateUserAccount)

  module.exports = router