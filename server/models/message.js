module.exports = (sequelize, DataTypes) => {
    var Message = sequelize.define('Message', {
        content: { type: DataTypes.STRING, allowNull: false }
    });

    return Message;
};