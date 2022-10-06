const {ObjectId} = require ('mongodb');

exports.handler = async (event) =>
{
    let client = await require('db');
    let body = JSON.parse(event.body); 
    try
    {
        let update = await client.db().collection('register').updateOne({_id: ObjectId(body._id)},
            {
                $set:{
                    email:body.email,
                    phone:body.phone
                }    
            })
            if(update)
            {
                return {
                    statusCode: 200,
                    body: JSON.stringify(
                      {
                        statusCode: 200,
                        status: true,
                        message: 'Update sucessfull...!',
                      }
                    )
                  }
            }
            else
            {
                return {
                    statusCode: 400,
                    body: JSON.stringify(
                      {
                        statusCode: 400,
                        status: false,
                        message: 'update unsucessfull...!'
                      }
                    )
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