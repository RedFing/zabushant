var db = require('../models');
var sequelize = db.sequelize;
async function getAllChannels(userId) {
    console.log("USER ID IS", userId);
    let res =  await sequelize.query(
        `   SELECT "ChannelId", name, "isDirectMessage" FROM "UserChannel"
            INNER JOIN "Channels" ON "Channels".id="UserChannel"."ChannelId"
            INNER JOIN "Users" ON "Users".id="UserChannel"."UserId"
            WHERE "UserId"=${userId}`
        , { type: sequelize.QueryTypes.SELECT});
    console.log(res);
    return res;
}
async function getAllMessages(channelId) {
    let res =  await sequelize.query(
        `   SELECT "Users".username, "Messages".content, "Messages"."createdAt" FROM "Messages"
            INNER JOIN "Users" ON "Users".id="Messages"."userId"
            INNER JOIN "Channels" ON "Channels".id="Messages"."channelId"
            WHERE "channelId"=${channelId}`
        , { type: sequelize.QueryTypes.SELECT});
    console.log(res);
    return res;
}
async function insertMessage(userId, channelId, content) {
    let res = await sequelize.query(
        `    INSERT INTO "Messages" (content, "channelId", "userId", "createdAt", "updatedAt")
             VALUES ('${content}', ${channelId}, ${userId}, current_date, current_date)`
        , { type: sequelize.QueryTypes.SELECT});
    console.log(res);
    return res;
}

module.exports = {
    getAllChannels: getAllChannels,
    getAllMessages: getAllMessages,
    insertMessage: insertMessage
};