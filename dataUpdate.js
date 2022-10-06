const { ObjectId } = require('mongodb');

exports.handler = async (event) => {
  let client = await require('db');
  let body = JSON.parse(event.body);
  try {
    var _id = await client.db().collection('register').findOne({_id:ObjectId(body._id)})
    if(!_id){
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            statusCode: 200,
            status: false,
            message: 'Data Not found...!'
          }
        )
      }
    }else{
        var update = await client.db().collection('register').updateOne(
          { _id: ObjectId(body._id) },  
          { 
              $set: 
                {
                  //sports:{$each:body.sports}
                 sports:body.sports
                }
          });
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          statusCode: 200,
          status: true,
          message: 'Data Updated...!'
        }
      )
    }
  }
  catch (error) {
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