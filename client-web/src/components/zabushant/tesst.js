import axios from "axios/index";

const state = {
    messages: [
        {
            channelId: 1,
            channelMessages: [
                {
                    "username": "muks",
                    "content": "ee gdje si, mux je",
                    "createdAt": "2018-01-07T13:56:28.967Z"
                },
                {
                    "username": "haris",
                    "content": "ee, sta radis, haris je",
                    "createdAt": "2018-01-07T13:56:28.967Z"
                }
            ]
        },
    ]
};

const allChannelMessagesRequests = channels.map(c => {
   return  axios.get(`/get-all-messages/${c.Channels}`)
});

axios.all(allChannelMessagesRequests)
    .then(allRes => {
        const all = allRes.map((res,i) => {
            return {
                channelId: channels[i].ChannelId,
                channelMessages: res.data
            }
        });
        this.setState({ messages: all});

    })
    .catch(err => this.setState({ err: true}));


const channels = [
    {
        "ChannelId": 1,
        "name": "mux-haris",
        "isDirectMessage": true
    },
    {
        "ChannelId": 2,
        "name": "mux2-haris",
        "isDirectMessage": true
    },
    {
        "ChannelId": 3,
        "name": "dev",
        "isDirectMessage": false
    }
];