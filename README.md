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
  - sends three thumbnails to s3

## Todos

- [ ] Create a poster size image with thumbnails
- [ ] Refactor lambda thumbnail function
- [x] Design email template function
  - [ ] Add user profile link to emailVideo
- [ ] Google Photos API
  - [x] Separate permission from login
  - [x] Refresh access token logic
  - [ ] How to get video from GP to AWS
