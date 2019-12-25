const express = require('express');
const checkListDependentRoute = express.Router();
const simpleRouter = express.Router();
const Checklist = require('../models/checklist');
const Task = require('../models/task');


checkListDependentRoute.get('/:id/tasks/new', async (req, res) => {
  try {
    let task = new Task();
    res.status(200).render('tasks/new', { checkListId: req.params.id, task: task });
  } catch (e) {
    res.status(422).render('pages/error', { error: 'Error ao carregar o formulário' });
  }
});

checkListDependentRoute.post('/:id/tasks', async (req, res) => {
  let { name } = req.body.task;
  let task = new Task({ name, checkList: req.params.id });

  try {
    await task.save();
    let checklist = await Checklist.findById(req.params.id);
    checklist.tasks.push(task);
    await checklist.save();
    res.redirect(`/checklists/${req.params.id}`)
  } catch (e) {
    let errors = e.errors;
    res.status(422).render('tasks/new', { task: { ...task, errors }, checkListId: req.params.id })
  }
});

simpleRouter.delete('/:id', async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id);
    let checklist = await Checklist.findById(task.checkList);
    let taskToRemove = checklist.tasks.indexOf(task._id);
    checklist.tasks.splice(taskToRemove, 1);
    checklist.save();
    res.redirect(`/checklists/${checklist.id}`);
  } catch (e) {
    res.status(422).render('pages/error', { error: 'Error ao remover tarefa' });
  }
});

simpleRouter.put('/:id', async (req, res) => {
  let task = await Task.findById(req.params.id);
  let done = req.body.done == 'true'
  try {
    task.set({ done: done });
    await task.save();
    res.status(200).json({ task });
  } catch (e) {
    let errors = e.errors;
    res.status(422).json({ task: { ...errors } })
  }
});

module.exports = {
  checklistDependent: checkListDependentRoute,
  simple: simpleRouter
}