const helpRequestFixtures = {
    oneDate: 
        {
            "id": 0,
            "requesterEmail": "abc@ucsb.edu",
            "teamId": "string0",
            "tableOrBreakoutRoom": "room0",
            "requestTime": "2024-02-12T00:16",
            "explanation": "help",
            "solved": false
          },
    threeDates: [
        {
            "id": 1,
            "requesterEmail": "local@ucsb.edu",
            "teamId": "string1",
            "tableOrBreakoutRoom": "room1",
            "requestTime": "2024-02-13T00:16",
            "explanation": "help me",
            "solved": true
          },
          {
            "id": 2,
            "requesterEmail": "host@ucsb.edu",
            "teamId": "string2",
            "tableOrBreakoutRoom": "room2",
            "requestTime": "2024-02-14T00:16",
            "explanation": "help my team",
            "solved": true
          },
          {
            "id": 3,
            "requesterEmail": "ucsb@ucsb.edu",
            "teamId": "string3",
            "tableOrBreakoutRoom": "room3",
            "requestTime": "2024-02-15T00:16",
            "explanation": "errrrror",
            "solved": true
          }
    ]
};


export { helpRequestFixtures };
