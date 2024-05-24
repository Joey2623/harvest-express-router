const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.get("/", async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

router.get("/:userId", async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send("Not found");
    }
});

router.put("/:userId", async (req, res) => {
    let user = await User.findByPk(req.params.userId);

    if (user) {
        user = await user.update({
            name: req.body.name,
            age: req.body.age,
        });
    } else {
        res.status(404).send("Not found");
    }
});

router.post("/", async (req, res) => {
    const user = await User.create({
        name: req.params.name,
        age: req.params.age,
    });
    res.send(user);
});

router.delete("/:userId", async (req, res) => {
    const user = await User.findByPk(req.params.userId);

    if (user) {
        await user.delete();
        res.status(204).send();
    } else {
        res.status(404).send("Not found");
    }
});

module.exports = router;