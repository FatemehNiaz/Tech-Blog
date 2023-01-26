const {Model, DataTypes}=require("sequelize");
const bcrypt = require('bcrypt');
const sequelize=require("../config/connections");

class User extends Model{
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username:{
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    password:{
      type: DataTypes.STRING(250),
      allowNull: false,
      validate: {
        len: [25],
      }
    }
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);
module.exports=User;