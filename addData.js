let { ObjectId } = require("mongodb");
exports.handler = async (event) => {
  try {
    let client = await require('db');
    let body = JSON.parse(event.body);
    var otp = Math.floor(1000 + Math.random() * 9000);
    let sports = [];
    var data = await client.db().collection('register').findOne({ Email: body.Email })
    if (data) {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            statusCode: 200,
            status: true,
            message: 'Already register !'
          }
        )
      }
    }
    else if (typeof body.fName == "undefined" || body.fName == "" || body.lName == "undefined" || body.lName == ""|| body.Email == "undefined" || body.Email == "" || body.phone == "undefined" || body.phone == "" || body.address == "undefined" || body.address == "" ||  body.sports == "undefined" || body.sports == "" ||  body.marks == "undefined" || body.marks == "") {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            statusCode: 400,
            status: false,
            message: 'Cant add data '
          }
        )
      }
    }
    else {
      const get = await client.db().collection('register').insertOne({
        fName: body.fName,
        lName:body.lName,
        Email: body.Email,
        phone: body.phone,
        address: body.address,
        otp:otp,
        sports:body.sports,
        marks:body.marks
      })
      console.log(get.insertedId)
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            statusCode: 200,
            status: true,
            message: 'Register sucessfull!',
            data: get
          }
        )
      }
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


      