const { ObjectId } = require("mongodb");
exports.handler = async (event) => {
    try {
        let client = await require('db');
        let body = JSON.parse(event.body);
        var addTask = await client.db().collection('task').insertOne({
            location: body.location,
            company: body.company,
            technology: body.technology
        })
        if (addTask.length) {
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        statusCode: 200,
                        status: true,
                        message: 'Register sucessfull...!',
                        data: addTask
                    }
                )
            }
        }
        else {
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        statusCode: 200,
                        status: false,
                        message: 'Something went wrong...!',
                        data: []
                    }
                )
            }
        }
    }
    catch (error) {
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