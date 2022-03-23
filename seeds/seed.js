/* eslint-disable @typescript-eslint/no-var-requires */
const sequelize = require('../dist/config/connection');
const { User, Post, Comment } = require('../dist/models');

const userSeed = require('./userData.js');
const postSeed = require('./postData.js');
const commentSeed = require('./commentData.js');


const seedAll = async () => {
  await sequelize.query('SET FOREIGN_KEY_CHECKS=0')
   .then(() => {
     return sequelize.sync({ force: true });
   });
  await postSeed();
  await userSeed();
  await commentSeed();

  process.exit(0);
};


seedAll();