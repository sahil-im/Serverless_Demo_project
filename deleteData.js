let { ObjectId, Db } = require("mongodb");
exports.handler = async (event) => {
  try {
    let client = await require('db');
    let body = JSON.parse(event.body);
    var data = await client.db().collection('register').findOne({_id:ObjectId(body._id)})
    if(!data)
    {
        return {
            statusCode: 200,
            body: JSON.stringify(
              {
                statusCode: 200,
                status: false,
                message: 'Not register !'
              }
            )
          }
    }
    else
    {
        var deleteData = client.db().collection('register').deleteOne({_id:ObjectId(body._id)})
        if(!deleteData)
        {
            return {
                statusCode: 200,
                body: JSON.stringify(
                  {
                    statusCode: 200,
                    status: false,
                    message: 'Not deleted..... !'
                  }
                )
              }
        }
        else
        {
            return {
                statusCode: 200,
                body: JSON.stringify(
                  {
                    statusCode: 200,
                    status: true,
                    message: ' data deleted !'
                  }
                )
              }
        }
    }
  }
  catch(error)
{
    return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: error.stack
          }
        )
      }
}
}