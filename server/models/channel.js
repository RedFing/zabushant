module.exports = (sequelize, DataTypes) => {
    var Channel = sequelize.define('Channel', {
        name: { type: DataTypes.STRING, defaultValue: '' },
        isDirectMessage: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    });
    Channel.associate = function(models) {
        models.Channel.belongsToMany(models.User, {through: 'UserChannel'});
        models.Channel.hasMany(models.Message, { foreignKey: 'channelId'});
    };

    return Channel;
};