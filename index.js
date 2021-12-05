require('dotenv').config();
const fetch = require('cross-fetch');

const { BEARER_TOKEN } = process.env;

const getUser = async () => {
    const response = await fetch('https://api.twitter.com/2/users/by/username/ucurtmaprojesi',
        { method: 'GET', headers: { Authorization: `Bearer ${BEARER_TOKEN}` } });
    const users = await response.json();
    console.log(users);
}

const getRetweets = async () => {
    const response = await fetch(`https://api.twitter.com/1.1/statuses/retweets/1466475562168459269.json?count=100`,
        { method: 'GET', headers: { Authorization: `Bearer ${BEARER_TOKEN}` } });
    const retweets = await response.json();
    const users = retweets.map(retweets => {
        return {
            name: retweets.user.name,
            screen_name: retweets.user.screen_name,
            id: retweets.user.id
        }
    });
    console.log(users);
}

const getFollowers = async () => {
    let cursor = -1;
    const allFollowers = [];

    while (cursor !== 0) {
        const response = await fetch(`https://api.twitter.com/1.1/followers/list.json?screen_name=ucurtmaprojesi&cursor=${cursor}`,
            { method: 'GET', headers: { Authorization: `Bearer ${BEARER_TOKEN}` } });
        const followers = await response.json();
        
        allFollowers.push(...followers.users);
        cursor = followers.next_cursor;
    }
    console.log(allFollowers.map(follower => follower.screen_name));
}

try {
    // getUser();
    // getFollowers();
    getRetweets();
} catch (e) {
    console.log(e);
}