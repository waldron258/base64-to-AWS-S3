// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
require("dotenv").config();
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

const uploadB64Image = async (base64, expirationTime, key) => {
  base64Data = Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const params = {
    Body: base64Data,
    ContentType: "image/jpg",
    Bucket: process.env.BUCKET_NAME,
    ContentEncoding: "base64",
    Key: key,
  };
  const result = await new Promise((resolve, reject) => {
    s3.putObject(params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  }).catch((err) => {
    console.log(err);
  });

  const publicURL = {
    Bucket: process.env.BUCKET_NAME,
    Key: key,
    Expires: expirationTime,
  };
  let url = s3.getSignedUrl("getObject", publicURL);
  result.url = url;
  return result;
};

exports.luchoFunkchon = async (event) => {
  return uploadB64Image(event.image, event.expirationTime, event.name);
};
