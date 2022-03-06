import { Model, DataTypes } from "sequelize";

// const { Model, DataTypes } = require('sequelize');
import bcrypt from "bcrypt";
// const bcrypt = require('bcrypt');
import sequelize from "../config/connection";

class User extends Model {
  public id!: number;
  public username: string;
  public email: string;
  public password: string;

  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }

  hashPassword(userData) {
    return bcrypt.hash(userData.password, 10);
  }

  getPassword() {
    return this.password;
  }

  setPassword(password) {
    this.password = password;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        length: 8,
      },
    },
  },
  {
    hooks: {
      beforeCreate: (userData, options) => {
        userData.password = userData.hashPassword(userData);
      },
      beforeUpdate: (userData) => {
        userData.password = userData.hashPassword(userData);
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

// module.exports = User;
export default User;
