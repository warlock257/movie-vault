'use strict';
module.exports = (sequelize, DataTypes) => {
  const movies = sequelize.define('movies', {
    title: DataTypes.STRING,
    upc: DataTypes.STRING,
    format: DataTypes.STRING,
    imgUrl: DataTypes.STRING
  }, {});
  movies.associate = function(models) {
    // associations can be defined here
  };
  return movies;
};