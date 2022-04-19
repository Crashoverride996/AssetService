const { Router } = require('express')
const express = require('express')
const router = express.Router()

router.get("/", (req, res) => {
    res.send("User List")
})

router.get("/new", (req, res) => {
    res.send("User New Form")
})

router.post("/", (req, res) => {
    res.send("Create User")
})

router.route("/:id").get((req, res) => {
    console.log(req.user)
    res.send("User Get ${req.params.id}")
}).put((req, res) => {
    res.send("Update user with ID ${req.params.id}")
}).delete((req, res) => {
    res.send("Delete user with ID ${req.params.id}")
})

const users = [{ name: "Kyle" }, { name: "Sally" }]
router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})

router.get("/:id", (req, res) => {
    res.send("User Get ${req.params.id}")
})

router.put("/:id", (req, res) => {
    res.send("Update user with ID ${req.params.id}")
})

router.delete("/:id", (req, res) => {
    res.send("Delete user with ID ${req.params.id}")
})

module.exports = router