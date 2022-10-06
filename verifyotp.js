const {ObjectId} = require('mongodb');
exports.handler = async (event) =>
{
    try{
        let client = await require('db');
        let body = JSON.parse(event.body);
        let otp = body.otp
        let findOtp = await client.db().collection('register').findOne({_id: ObjectId(body._id)});
        if(findOtp.otp === otp)
        {
            return {
                statusCode: 200,
                body: JSON.stringify(
                  {
                    statusCode: 200,
                    status: true,
                    message: 'OTP verify...!',
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
                    message: 'Worng OTP ...!'
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
