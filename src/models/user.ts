import { Model, DataTypes, Optional } from "sequelize";

// const { Model, DataTypes } = require('sequelize');
import bcrypt from "bcrypt";
// const bcrypt = require('bcrypt');
import sequelize from "../config/connection";

type UserAttributes = {
  id:         number,
  username:   string,
  email:      string,
  password:   string,
};

type UserCreationAttributes = Optional<UserAttributes, 'id'>;

class user extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;

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

user.init(
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
      unique: true
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
      // validate: {
      //   length: 8,
      // },
    },
  },
  {
    hooks: {
      beforeCreate: async (userData, options) => {
        userData.password = await userData.hashPassword(userData);
      },
      beforeUpdate: async (userData) => {
        userData.password = await userData.hashPassword(userData);
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
    tableName: "user",
  }
);

// module.exports = User;
export default user;
