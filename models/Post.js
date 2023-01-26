const {Model, DataTypes}=require("sequelize");
const sequelize=require("../config/connections");

class Post extends Model{}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    postTitle:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    postContent:{
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    postDate:{
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    userId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"user",
        key:"id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);
module.exports=Post;