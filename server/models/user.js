module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        username: { type: DataTypes.STRING, unique: true, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false }
    });

    return User;
};