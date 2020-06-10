/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { generatePassword } = require('../utils/PasswordGenerator');

const Vendor = require('../models/Vendor.js');
const User = require('../models/User.js');
const Service = require('../models/Service.js');

const categoryRaw = [
  {
    name: 'business',
    cover: '/img/categories/business.jpeg',
    subs: [
      'event organizer',
      'finance and legal',
      'finance and marketing',
      'graphics designer',
      'it and web development',
      'interior decorator'
    ]
  },
  {
    name: 'hair and beauty',
    cover: '/img/categories/hair-dresser.jpeg',
    subs: ['hair stylists', 'mobile barbers']
  },
  {
    name: 'fashion',
    cover: '/img/categories/hair-dresser.jpeg',
    subs: ['bespoke tailors', 'nigerian tailors', 'shoe makers', 'suit makers']
  },
  {
    name: 'child care',
    cover: '/img/categories/childcare.jpeg',
    subs: ['child care center', 'pediatrician']
  },
  {
    name: 'adult services',
    cover: '/img/categories/adult-service.jpeg',
    subs: ['escort services', 'home service', 'sensual massage']
  },
  {
    name: 'cleaning',
    cover: '/img/categories/cleaning.jpeg',
    subs: ['home cleaning', 'landscaping', 'laundry']
  },
  {
    name: 'gadget repair',
    cover: '/img/categories/gadget-repair.jpeg',
    subs: ['computer repair', 'mobile repair']
  },
  {
    name: 'automative',
    cover: '/img/categories/gadget-repair.jpeg',
    subs: ['cab service', 'car dealers', 'car care and servicing']
  },
  {
    name: 'health and fitness',
    cover: '/img/categories/gadget-repair.jpeg',
    subs: ['gym', 'yoga']
  },
  {
    name: 'training and education',
    cover: '/img/categories/event.jpeg',
    subs: []
  },
  {
    name: 'real estate',
    cover: '/img/categories/barbers.jpeg',
    subs: []
  },
  {
    name: 'spa and wellness',
    cover: '/img/categories/cleaning.jpeg',
    subs: []
  },
  {
    name: 'food and drinks',
    cover: '/img/categories/gadget-repair.jpeg',
    subs: []
  },
  {
    name: 'photography and videography',
    cover: '/img/categories/gadget-repair.jpeg',
    subs: []
  }
];

exports.categories = categoryRaw;

// eslint-disable-next-line require-await
exports.getCategories = async (req, res, next) => {
  try {
    res.send({
      state: 'OK',
      payload: categoryRaw
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};

exports.loadServices = async (req, res, next) => {
  try {
    let { name } = req.params;
    const { country } = req.query;
    name = name.replace(/-/g, ' ');

    const catgIndex = await categoryRaw.findIndex((catg) => {
      if (catg.name === name) return true;
      else if (catg.subs.filter((a) => a === name).length >= 1) return true;
      else return false;
    });

    if (catgIndex === -1) {
      return res.status(404).send({
        state: 'NO',
        message: 'category not found'
      });
    }

    const services = await Service.find({
      $or: [{ category: name }, { subCategory: name }],
      isApproved: true,
      isActive: true
    }).populate('vendor', [
      'businessName',
      'businessEmail',
      'businessCountry',
      'businessAddress',
      'description',
      'businessRating',
      'businessReviews',
      'cover',
      'username',
      'likedBy'
    ]);

    res.status(200).send({
      state: 'OK',
      payload: {
        ...categoryRaw[catgIndex],
        services
      }
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      state: 'ERROR',
      payload: error.message
    });
  }
};
