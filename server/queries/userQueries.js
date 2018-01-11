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
        `   SELECT "Users".username, "Messages".content, "Messages"."createdAt", "Messages".id FROM "Messages"
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
             VALUES ('${content}', ${channelId}, ${userId}, current_date, current_date) RETURNING *`
        , { type: sequelize.QueryTypes.SELECT});
    console.log(res);
    return res;
}
async function createGroupChannel(channelName, userIds, isDirectMessage) {
    let query1 = await sequelize.query(
        `       INSERT INTO "Channels" (name, "isDirectMessage", "createdAt", "updatedAt")
                VALUES ('${channelName}', ${isDirectMessage?'true':'false'}, current_date, current_date) RETURNING id;`
        , { type: sequelize.QueryTypes.SELECT});
    const channelId = query1[0].id;
    let query2Promises = userIds.map(u =>
        sequelize.query(
            `INSERT INTO "UserChannel" ("createdAt", "updatedAt", "ChannelId", "UserId")
            VALUES (current_date, current_date, ${channelId}, ${u})`,
            { type: sequelize.QueryTypes.SELECT}));
    let res = await Promise.all(query2Promises);
    return res;
}

async function createDirectMessageChannelsForNewUser(newUserId, newUserName){
    let allUsers = await db.User.findAll({ attributes: ['id', 'username']});
    let res = allUsers.map(user => {
        const channelName = user.username + ' - ' + newUserName;
        return createGroupChannel(channelName, [newUserId,user.id], true);
    });
    return Promise.all(res);

}

module.exports = {
    getAllChannels: getAllChannels,
    getAllMessages: getAllMessages,
    insertMessage: insertMessage,
    createGroupChannel: createGroupChannel,
    createDirectMessageChannelsForNewUser: createDirectMessageChannelsForNewUser
};