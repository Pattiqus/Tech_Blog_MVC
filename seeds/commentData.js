/* eslint-disable @typescript-eslint/no-var-requires */
const { Comment } = require("../dist/models")

const commentData = [
    {
        "user_id": "1",
        "post_id": "1",
        "comment": "Awesome!"
    },
    {
        "user_id": "1",
        "post_id": "1",
        "comment": "Awesome!"
    },
    {
        "user_id": "2",
        "post_id": "1",
        "comment": "Very informative!"
    },
    {
        "user_id": "2",
        "post_id": "3",
        "comment": "Thank you for the info!"
    },
    {
        "user_id": "1",
        "post_id": "3",
        "comment": "I agree with that!"
    },
    {
        "user_id": "1",
        "post_id": "1",
        "comment": "Nicely said!"
    },
    {
        "user_id": "3",
        "post_id": "4",
        "comment": "Can't wait to talk about this with you!"
    },
    {
        "user_id": "4",
        "post_id": "3",
        "comment": "Wow. Nice to know!"
    }
];

const commentSeed = () => Comment.bulkCreate(commentData)

module.exports = commentSeed;