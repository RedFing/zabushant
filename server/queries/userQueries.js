var db = require('../models');
var sequelize = db.sequelize;

async function getAllChannels(userId) {
    console.log('getAllChannels');
    console.log("USER ID IS", userId);
    let res =  await sequelize.query(
        `   SELECT "ChannelId", name, "isDirectMessage" FROM "UserChannel"
            INNER JOIN "Channels" ON "Channels".id="UserChannel"."ChannelId"
            INNER JOIN "Users" ON "Users".id="UserChannel"."UserId"
            WHERE "UserId"=?`
        , { replacements: [userId], type: sequelize.QueryTypes.SELECT});
    console.log(res);
    /*
        [{ChannelId: 1, name: 'bla', isDirectMessage: true}]
     */
    let usersFromChannelsPromises = res.map(ch => getAllUserIdsForChannel(ch.ChannelId));
    let res3 = await Promise.all(usersFromChannelsPromises);
    const finalRes = res.map((ch, i) => ({...ch, users: res3[i].map(el =>el.UserId)}));

    return finalRes;
}
async function getAllMessages(channelId) {
    let res =  await sequelize.query(
        `   SELECT "Users".username, "Messages".content, "Messages"."createdAt", "Messages".id FROM "Messages"
            INNER JOIN "Users" ON "Users".id="Messages"."userId"
            INNER JOIN "Channels" ON "Channels".id="Messages"."channelId"
            WHERE "channelId"= ?`
        , { replacements: [channelId], type: sequelize.QueryTypes.SELECT});
    console.log(res);
    return res;
}
async function insertMessage(userId, channelId, content) {
    let res = await sequelize.query(
        `    INSERT INTO "Messages" (content, "channelId", "userId", "createdAt", "updatedAt")
             VALUES (?, ?, ?, current_date, current_date) RETURNING *`
        , { replacements: [content, channelId, userId],type: sequelize.QueryTypes.SELECT});
    console.log(res);
    return res;
}
async function createGroupChannel(channelName, userIds, isDirectMessage) {
    let query1 = await sequelize.query(
        `       INSERT INTO "Channels" (name, "isDirectMessage", "createdAt", "updatedAt")
                VALUES (?, ?, current_date, current_date) RETURNING id;`
        , { replacements: [channelName, !!isDirectMessage], type: sequelize.QueryTypes.SELECT});
    const channelId = query1[0].id;
    let query2Promises = userIds.map(u =>
        sequelize.query(
            `INSERT INTO "UserChannel" ("createdAt", "updatedAt", "ChannelId", "UserId")
            VALUES (current_date, current_date, ?, ${u})`,
            { replacements: [channelId], type: sequelize.QueryTypes.SELECT}));
    let res = await Promise.all(query2Promises);
    return res;
}
async function createDirectMessageChannelForMyself(userId, userName) {
    const channelName = userName+ ' - '+ userName;
    return await createGroupChannel(channelName, [userId], true);
}

async function getAllUserIdsForChannel(channelId) {
    let res = await sequelize.query(
        `   SELECT "UserId" FROM "UserChannel" WHERE "ChannelId"=?
        `
        , { replacements: [channelId],type: sequelize.QueryTypes.SELECT});
    console.log(res);
    return res;
}


module.exports = {
    getAllChannels: getAllChannels,
    getAllMessages: getAllMessages,
    insertMessage: insertMessage,
    createGroupChannel: createGroupChannel,
    createDirectMessageChannelForMyself: createDirectMessageChannelForMyself,
    getAllUserIdsForChannel: getAllUserIdsForChannel
};