var moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    var Token = sequelize.define('Token', {
        tokenValue : { type: DataTypes.STRING, allowNull: false},
        type: { type: DataTypes.STRING, allowNull: false, defaultValue: 'forgot-password' },
        email: { type: DataTypes.STRING, allowNull: false},
        active: {type:DataTypes.BOOLEAN, defaultValue: true},
        expirationDate: {type:DataTypes.DATE, defaultValue: moment().add(1, 'days').toDate()}
    });

    return Token;
};