#!/bin/bash
echo "sleeping for 4 seconds"
sleep 4

 
mongo --host mongodb:27017 --eval '

rs.initiate( {
    _id : "rs0",
    members: [
    { _id: 0, host: "localhost:27017" }
    ]
})
'

# echo mongo_setup.sh time now: `date +"%T" `
# mongosh --host mongo1:27017 <<EOF
#   var cfg = {
#     "_id": "rs0",
#     "version": 1,
#     "members": [
#       {
#         "_id": 0,
#         "host": "mongo1:27017",
#         "priority": 2
#       },
#       {
#         "_id": 1,
#         "host": "mongo2:27017",
#         "priority": 0
#       },
#     ]
#   };
#   rs.initiate(cfg);
# EOF