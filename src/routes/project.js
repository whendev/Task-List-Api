const express = require('express');
const projectController = require('../controllers/project');
const autService = require('../services/auth-service');

const router = express.Router();

router.post('/create', projectController.create);
router.get('/', projectController.listProjects);
router.delete('/:id', projectController.deleteProject);
router.put('/', projectController.updateProject);

module.exports = router;
