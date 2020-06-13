const Category = require('../models/Category');

const { validationHandler } = require('../middlewares/fieldValidation');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true });

    res.status(200).send({
      state: 'OK',
      payload: categories
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const { name, description, tags } = req.body;

    let category = await Category.find({
      name: name.toLowerCase(),
      isActive: true
    });

    if (category.length >= 1) {
      return res.status(422).send({
        state: 'NO',
        message: 'name already exist'
      });
    }

    category = await Category.create({
      name: name.toLowerCase(),
      description,
      tags
    });

    res.status(200).send({
      state: 'OK',
      payload: category
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.getSingleCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ _id: id, isActive: true });

    if (!category) {
      return res.status(404).send({
        state: 'NO',
        message: 'category not found'
      });
    }

    res.status(200).send({
      state: 'OK',
      payload: category
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ _id: id });

    if (!category) {
      return res.status(404).send({
        state: 'NO',
        message: 'category not found'
      });
    }

    await category.remove();

    res.status(200).send({
      state: 'OK',
      message: 'category removed successfully'
    });
  } catch (error) {
    console.log(error);

    res.status(503).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const { id } = req.params;
    const { name, description, tags } = req.body;

    let category = await Category.findOne({ _id: id, isActive: true });

    if (!category) {
      return res.status(404).send({
        state: 'NO',
        message: 'category not found'
      });
    }

    const nameCheck = await Category.findOne({ name: name.toLowerCase() });

    if (nameCheck && nameCheck._id !== id) {
      return res.status(422).send({
        state: 'NO',
        message: 'name already exist'
      });
    }

    category = await category.updateOne({
      name: name.toLowerCase(),
      description,
      tags
    });

    res.status(200).send({
      state: 'OK',
      message: 'category updated',
      payload: category
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.getAllSubCategories = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ _id: id, isActive: true });

    if (!category) {
      return res.status(404).send({
        state: 'NO',
        message: 'category not found'
      });
    }

    res.status(200).send({
      state: 'OK',
      message: `${category.subs.length} categories found`,
      payload: category.subs
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.addSubCategory = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const { id } = req.params;
    const { name, description, tags } = req.body;

    let category = await Category.find({ name: name.toLowerCase() });

    if (category.length >= 1) {
      return res.status(422).send({
        state: 'NO',
        message: 'name already exist'
      });
    }

    category = await Category.findOne({ _id: id, isActive: true });

    if (!category) {
      return res.status(404).send({
        state: 'NO',
        message: 'category not found'
      });
    }

    if (
      (await category.subs.filter(
        (a) => a.name.toLowerCase() === name.toLowerCase()
      ).length) >= 1
    ) {
      return res.status(422).send({
        state: 'NO',
        message: 'name already exist'
      });
    }

    await category.updateOne({
      $addToSet: {
        subs: {
          name: name.toLowerCase(),
          description,
          tags
        }
      }
    });

    res.status(200).send({
      state: 'OK',
      message: 'category sub added',
      payload: category
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.updateSubCategory = async (req, res, next) => {
  try {
    await req.getValidationResult().then(validationHandler());

    const { id } = req.params;
    const { name, description, tags, subId } = req.body;

    const category = await Category.findOne({ _id: id, isActive: true });

    if (!category) {
      return res.status(404).send({
        state: 'NO',
        message: 'category not found'
      });
    }

    if (
      (await category.subs.filter(
        (a) => a.name.toLowerCase() === name.toLowerCase()
      ).length) === 0
    ) {
      return res.status(404).send({
        state: 'NO',
        message: 'sub category not found'
      });
    }

    const newSubEntry = await category.subs.map((sub, i, _) => {
      if (sub._id === subId) {
        return { name, description, tags };
      } else {
        return sub;
      }
    });

    await category.updateOne({
      subs: newSubEntry
    });

    res.status(200).send({
      state: 'OK',
      message: 'category sub updated',
      payload: category
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

// eslint-disable-next-line require-await
exports.deleteSubCategory = async (req, res, next) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const { id } = req.params;
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};
