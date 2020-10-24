const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Post model
// this is the data users post...

class Post extends Model {}

// create the fields and columns for Post model
// need to figure out the timestamp or posting date functionality...later
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        contents: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        freeTableName: true,
        underscored: true,
        modelName: 'post',
        createdAt: true,
        updatedAt: 'updateTimestamp'
    }
);

module.exports = Post