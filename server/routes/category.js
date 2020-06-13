const express = require('express');
const expressValidator = require('express-validator');

const router = express.Router();

const { validate } = require('../middlewares/fieldValidation');
const { adminAuth } = require('../middlewares/authentication');

const {
  getAllCategories,
  createCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
  getAllSubCategories,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory
} = require('../controllers/category');

router.use(expressValidator());

router
  .route('/')
  .get(getAllCategories)
  .post(adminAuth, validate('createCategory'), createCategory);

router
  .route('/:id')
  .get(adminAuth, getSingleCategory)
  .put(adminAuth, validate('createCategory'), updateCategory)
  .delete(adminAuth, deleteCategory);

router
  .route('/:id/sub')
  .get(getAllSubCategories)
  .post(adminAuth, validate('createSubCategory'), addSubCategory)
  .put(adminAuth, validate('updateSubCategory'), updateSubCategory)
  .delete(adminAuth, deleteSubCategory);

module.exports = router;
