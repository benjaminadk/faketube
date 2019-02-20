# FooTube

A clone of YouYube

## Contents

- [FooTube](#footube)

## Features

FooTube attempts go re-create some of the core functionality of YouTube. This includes:

1. Video uploads

- video files are saved to AWS S3
- bucket access restricted to FooTube

2. Video pre-processing

- videos are processed with `ffmpeg` and `ffprobe`

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
- [ ] Upload Page
  - [ ] Multi uploads
  - [ ] Collapse when published - hide form
- [ ] Video Player
  - [x] Refactor out Rail into custom component to capture time above hover vs play time
  - [x] Icon row
  - [ ] Make more thumbnails yt does 1 per sec ridiculous - spread my three based on time
  - [x] Query param for video time
  - [x] When video ends update view model
  - [x] Parse description for urls and times
  - [ ] Find out about hashes and other description parsables
  - [ ] Mini player mode
  - [ ] Theater mode
  - [ ] Save to playlist popup
  - [ ] More vert menu
- [x] Refetch videos query on video upload
- [x] Update links on upload page /watch
- [ ] User auth
  - [ ] ALlow user to signout
  - [ ] Switch google accounts
  - [ ] Handle no user signed in
