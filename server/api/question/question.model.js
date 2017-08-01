'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var validUnitPlacements = ['pre', 'post'];
var validStates = ['Draft', 'In-Review', 'Reviewed', 'Published', 'Rejected'];
var validBtlos = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
var validDifficultyLevels = [1, 2, 3, 4, 5];

var commentsSchema = new Schema({
  created: { type: Date, default: Date.now },
  commentedBy: String,
  comment: String,
  _id: { id: false }
});
var responsesSchema = new Schema({
  response: [String],
  mmc: [String],
  mh: String,
  default: Boolean,
  _id: { id: false }
});
var i18nSchema = new Schema({
  en: Object
});
var stepSchema = new Schema({
  text: String,
  answer: String,
  unit: String,
  unitPlacement: { type: String, enum: validUnitPlacements },
  responses: [responsesSchema],
  _id: { id: false }
});
var optionSchema = new Schema({
  text: String,
  image: String,
  answer: Boolean,
  mh: String,
  mmc: [String]
});
var fibSchema = new Schema({
  identifier: { type: String, unique: true },
  answer: String,
  responses: [responsesSchema]
});
var workSheetSchema = new Schema({
  _id: String,
  name: String
});

var QuestionSchema = new Schema({
  identifier: { type: String, unique: true },
  grade: { type: Number, min: 1, max: 5 },
  level: Number,
  subLevel: Number,
  btlo: { type: String, enum: validBtlos },
  difficultyLevel: { type: Number, min: 1, max: 5 },
  subject: { type: String, default: 'NUM' },
  conceptCode: String,
  es_difficultyLevel: String,
  qtype: String,
  active: Boolean,
  updated: { when: { type: Date, default: Date.now }, by: String },
  owner: String,
  state: { type: String, enum: validStates },
  workSheets: [workSheetSchema],
  maxAttempts: { type: Number, max: 10 },
  questionText: String,
  questionImage: [String],
  steps: [stepSchema],
  options: [optionSchema],
  fibs: [fibSchema],
  hintText: String,
  solutionText: String,
  expressions: String,
  i18n: [i18nSchema],
  comments: [commentsSchema]
});

module.exports = mongoose.model('Question', QuestionSchema);