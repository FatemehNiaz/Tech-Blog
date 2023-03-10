const {Model, DataTypes}=require("sequelize");
const sequelize=require("../config/connections");

class Comment extends Model{}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
  
    commentContent:{
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    commentDate:{
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
    },
    postId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model:"post",
        key:"id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);
module.exports=Comment;