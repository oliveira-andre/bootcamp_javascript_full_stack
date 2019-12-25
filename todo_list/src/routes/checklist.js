const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist');

router.get('/', async (req, res) => {
  try {
    let checklists = await Checklist.find();
    res.status(200).render('checklists/index', { checklists: checklists })
  } catch (e) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir as listas' });
  }
});

router.get('/new', async (req, res) => {
  try {
    let checklist = new Checklist();
    res.status(200).render('checklists/new', { checklist: checklist });
  } catch (e) {
    res.status(500).render('pages/error', { error: 'Erro ao iniciar uma nova lista' });
  }
});

router.post('/', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({ name });
  try {
    await checklist.save();
    res.redirect('/checklists');
  } catch (e) {
    let errors = e.errors
    res.status(422).render('checklists/new', { checklist: { ...checklist, errors } });
  }
});

router.get('/:id/edit', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/edit', { checklist: checklist })
  } catch (e) {
    res.status(422).render('pages/error', { error: 'Erro ao exibir a lista de tarefas' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate('tasks');
    res.status(200).render('checklists/show', { checklist: checklist })
  } catch (e) {
    res.status(500).render('pages/error', { error: 'Erro ao exibir a lista de tarefas' });
  }
});

router.put('/:id', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id);
  try {
    await checklist.update({ name });
    res.redirect('/checklists');
  } catch (e) {
    let errors = e.errors
    res.status(422).render('checklists/edit', { checklist: { ...checklist, errors } });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Checklist.findByIdAndRemove(req.params.id);
    res.redirect('/checklists');
  } catch (e) {
    res.status(500).render('pages/error', { error: 'Erro ao deletar a lista de tarefas' });
  }
});

module.exports = router;