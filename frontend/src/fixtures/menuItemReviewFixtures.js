const menuItemReviewFixtures = {
    oneReview: {
        "id": 1,
        "itemId": "101",
        "reviewerEmail": "localhost@dokku.com",
        "stars": "2",
        "dateReviewed": "2022-01-02T12:00:00",
        "comments": "not the best i have had"
    },
    threeReview: [
        {
            "id": 1,
            "itemId": "101",
            "reviewerEmail": "localhost@dokku.com",
            "stars": "2",
            "dateReviewed": "2022-01-02T12:00:00",
            "comments": "not the best i have had"
        },
        {
            "id": 2,
            "itemId": "102",
            "reviewerEmail": "dokku@localhost.com",
            "stars": "5",
            "dateReviewed": "2021-04-22T11:07:32",
            "comments": "the best ever!"
        },
        {
            "id": 3,
            "itemId": "103",
            "reviewerEmail": "swagger@dokku.com",
            "stars": "3",
            "dateReviewed": "2022-11-05T10:20:05",
            "comments": "meh meh"
        }
    ]
};


export { menuItemReviewFixtures };