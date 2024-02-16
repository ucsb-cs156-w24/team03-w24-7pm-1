const recommendationRequestFixtures = {
    oneRequest: {
        "id": 1,
        "requesterEmail": "cgaucho@ucsb.edu",
        "professorEmail": "notcgaucho@ucsb.edu",
        "explanation": "please",
        "dateRequested": "2022-01-02T12:00:00",
        "dateNeeded": "2022-02-02T12:00:00",
        "done": "true"
    },
    threeRequest: [
        {
            "id": 1,
            "requesterEmail": "cgaucho1@ucsb.edu",
            "professorEmail": "notcgaucho1@ucsb.edu",
            "explanation": "please1",
            "dateRequested": "2021-01-02T12:00:00",
            "dateNeeded": "2021-02-02T12:00:00",
            "done": true
        },
        {
            "id": 2,
            "requesterEmail": "cgaucho2@ucsb.edu",
            "professorEmail": "notcgaucho2@ucsb.edu",
            "explanation": "please2",
            "dateRequested": "2022-01-02T12:00:00",
            "dateNeeded": "2022-02-02T12:00:00",
            "done": false
        },
        {
            "id": 2,
            "requesterEmail": "cgaucho3@ucsb.edu",
            "professorEmail": "notcgaucho3@ucsb.edu",
            "explanation": "please3",
            "dateRequested": "2023-01-02T12:00:00",
            "dateNeeded": "2023-02-02T12:00:00",
            "done": true
        }
    ]
};


export { recommendationRequestFixtures };