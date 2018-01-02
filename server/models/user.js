module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    });

    User.associate = function(models) {
        models.User.belongsToMany(models.Channel, {through: 'UserChannel'});
        models.User.hasMany(models.Message, { foreignKey: 'userId'});
    };

    return User;
};