var express = require('express');
var router = express.Router();
var { Task } = require('./../db');

/* GET tasks listing. */
router.get('/', async function ({ userId }, res) {
    const tasks = await Task.find({ userId });

    res.send(tasks);
});

/* Post new task listing. */

router.post('/', async function ({ userId, body: newTaskData }, res) {
    await Task.create({ ...newTaskData, userId });

    res.end();
});

/* DELETE task listing. */

router.delete('/:id', async function ({ userId, params: { id } }, res) {
    await Task.findOneAndDelete({ _id: id, userId });

    res.end();
});

/* Put/Update task listing. */

router.put(
    '/:id',
    async function ({ userId, params: { id }, body: { title } }, res) {
        await Task.findOneAndUpdate({ _id: id, userId }, { title });

        res.end();
    }
);

module.exports = router;
