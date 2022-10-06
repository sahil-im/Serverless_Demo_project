const { ObjectId } = require('mongodb');

exports.handler = async (event) => {
    try {
        let client = await require('db');
       // let body = JSON.parse(event.body);
       // console.log(event)
        let query  = event["queryStringParameters"]

        //var findId = await client.db().collection('task').findOne({ _id: ObjectId()});
        var getData = await client.db().collection('task').aggregate(
            [
                {
                    $match:
                    {
                            _id:ObjectId(query._id)
                    }
                },
                {
                    $lookup: {
                        from: 'register',
                        localField: 'location',
                        foreignField: 'address',
                        as: 'data'
                    }
                },
                {
                  $unwind: {
                    path: '$data'
                  }
                },
                // // {
                // $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$data", 0 ] }, "$$ROOT" ] } }
                //},
                {
                    $project:
                    {
                        company: 1,
                        technology: 1,    
                        "data.Name":{$concat: ["$data.fName" ," " ,"$data.lName"]}
    
                    }
                },
            ]
        )
            .toArray()
        return {
            statusCode: 200,
            body: JSON.stringify(
                {
                    statusCode: 200,
                    status: true,
                    message: 'Data !',
                    data: getData
                }
            )
        }
    }
    catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify(
                {
                    message: err.stack
                }
            )
        }
    }
}