const express = require('express');
const { getUsers, createUser, getUserById, deleteUser } = require('../controllers/usersController');
const router = express.Router()
router.get("/", getUsers);
router.post("/create", createUser)
router.get("/:id", getUserById)
router.delete("/:id", deleteUser)

  module.exports = router