const { Model, DataTypes } = require ('sequelize');
const sequelize = require ('../config/connection');
const bcrypt = require ('bcrypt');

// create the user model, extends sequlize class 'Model'
class User extends Model {
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
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2]
            }
        }        
    },
    {
        hooks: {
            // wait for bcrypt to hash the password before proceding
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
            // wait for bcrypt to hash the password before proceding
            async beforeUpdate(updatedUserData) {
              updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
              return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
)

module.exports = User