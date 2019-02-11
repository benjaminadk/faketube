## FakeTube

## Notes

- nextjs, react-apollo frontend
- express/apollo-server
- prisma database
- oauth w/Google
- jsonwebtoken + cookie auth system
- user/admin roles
- video/image uploads to aws s3
- aws lambda function to create thumbnails
  - uses ffmpeg and ffprobe w/Nodejs `child_process`
  - finds duration of video
  - creates and sends three thumbnails to s3
  - 3sec preview GIF sent to s3

## Todos

- [ ] Lambda function video processing
  - [ ] Create a poster size image with thumbnails
  - [ ] Refactor code
  - [x] Create 3sec preview GIF
  - [ ] Check dimensions of GIF
- [x] Design email template function
  - [ ] Add user profile link to emailVideo
- [ ] Google Photos API
  - [x] Separate permission from login
  - [x] Refresh access token logic
  - [ ] How to get video file from Google Photo to AWS
