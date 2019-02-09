const mjml2html = require('mjml')

const { NODE_ENV, FRONTEND_DEV, FRONTEND_PROD } = process.env
const frontend = NODE_ENV === 'development' ? FRONTEND_DEV : FRONTEND_PROD

module.exports = async (user, title, message, videoID, imageURL) => {
  const htmlOutput = await mjml2html(`<mjml>

  <mjml-head>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Roboto" />
  </mjml-head>

  <mj-body>
    <mj-spacer height="50px" />
    <mj-section background-color="#eee" padding="20px">

      <mj-image width="100" align="left" href="${frontend}" src="https://s3-us-west-1.amazonaws.com/faketube/assets/fake-tube-light.png"></mj-image>

      <mj-section>
        <mj-column background-color="#fff" border="1px solid lightgrey">

          <mj-section>
            <mj-column width="17%">
              <mj-image width="50" align="left" src="${user.image}"></mj-image>
            </mj-column>
            <mj-column width="80%">
              <mj-text font-family="Roboto" font-size="17px" padding-top="25px">${
                user.name
              } has shared a video with you on FooTube</mj-text>
            </mj-column>
          </mj-section>

          <mj-text font-family="Roboto, Arial">${message}</mj-text>

          <mj-divider border-width="1px" border-style="solid" border-color="lightgrey" />

          <mj-image width="400" padding-bottom="50px" href="${frontend}/videos?id=${videoID}" src="${imageURL}"></mj-image>

          <mj-button href="${frontend}/videos?id=${videoID}" font-family="Roboto, Arial" font-size="16px" font-weight="bold" background-color="transparent" color="#333" align="left">
            ${title}
          </mj-button>

          <mj-text font-family="Roboto" font-size="12px" color="#bbb" padding-left="50px" padding-bottom="30px">By ${
            user.name
          }</mj-text>

        </mj-column>
      </mj-section>
      
      <mj-section>
        <mj-text font-family="Roboto" font-size="10px" color="grey"><a style="color:#3DA8FF;text-decoration: none;" href="http://support.google.com/youtube/?hl=en">Help center</a> &bull; <a style="color:#3DA8FF;text-decoration: none;" href="https://www.youtube.com/attribution_link?a=iOyqb_Yg8GwmwD-o&u=/email_spam%3Fv%3D1a%26c%3DUrUofCqctr3J5xRNHDtLfF7ziDkFECt39DLlNiD8NIFFLXpZONQ5JSCMmX8XCtNqzSqsV_n4xfN6bMZguP610nKlakNSxrbHPXYFrF29RljjTU7pUuTv1umn4WAfG3dyO-UA3n9-M7cHTHQgcgznL259ok3lJZEgx3RZmGRaF4848Oq_dbGDL8TBHHtDlFDQssGYdgnlkyU%3D">Report spam</a></mj-text>
        <mj-spacer height="20px" />
        <mj-text font-family="Roboto" font-size="12px" color="grey">©2019 FooTube, 3240 S Kerckhoff Ave. San Pedro CA, 90731, USA</mj-text>
      </mj-section>

    </mj-section>
  </mj-body>
</mjml>`)

  console.log(htmlOutput)

  return htmlOutput.html
}
