const AWS = require('aws-sdk')
const { promisify } = require('util')

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})

const getSignedUrl = promisify(s3.getSignedUrl.bind(s3))

module.exports = {
  getSignedUrl
}
