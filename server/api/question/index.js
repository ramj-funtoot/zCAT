'use strict';

var express = require('express');
var controller = require('./question.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:owner', controller.query);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id/:env', controller.publish);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/translate/:id/:target_language', controller.translate);
router.get('/worksheet/jsondata', controller.wsd);

module.exports = router;
