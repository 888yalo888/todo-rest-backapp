var express = require('express');
var router = express.Router();
var { Task } = require('./../db');

// router.use(function (req, res, next) {
//     if (!req.userId) {
//         res.status(403);
//         res.send();

//         return;
//     }

//     next();
// });

/* GET tasks listing. */
router.get('/', async function ({ userId }, res) {
    const tasks = await Task.find({ userId });
    res.send(tasks);
});

/* GET tasks listing. */
router.get('/:id', async function ({ userId, params: { id } }, res) {
    const task = await Task.findOne({ _id: id, userId });
    res.send(task);
});

/* Post new task listing. */

router.post('/', async function ({ userId, body: newTaskData }, res) {
    const { _id } = await Task.create({ ...newTaskData, userId });

    res.status(201).send({ id: _id });
});

/* DELETE task listing. */
router.delete('/:id', async function ({ userId, params: { id } }, res) {
    await Task.findOneAndDelete({ _id: id, userId });

    res.status(204).end();
});

/* Put task listing. */
router.put('/:id', async function ({ userId, params: { id }, body: { title } }, res) {
    await Task.findOneAndUpdate({ _id: id, userId }, { title });

    res.status(204).end();
});

module.exports = router;
