module.exports = {
        typeDefs: /* GraphQL */ `type AggregateComment {
  count: Int!
}

type AggregateReview {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type AggregateView {
  count: Int!
}

type BatchPayload {
  count: Long!
}

enum Category {
  FILM_ANIMATION
  AUTOS_VEHICLES
  MUSIC
  PETS_ANIMALS
  SPORTS
  TRAVEL_EVENTS
  GAMING
  PEOPLE_BLOGS
  COMEDY
  ENTERTAINMENT
  NEWS_POLITICS
  HOWTO_STYLE
  EDUCATION
  SCIENCE_TECHNOLOGY
  NONPROFITS_ACTIVISM
}

type Comment {
  id: ID!
  text: String!
  reply: Boolean!
  video: Video
  user: User
  replies(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  createdAt: DateTime!
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  text: String!
  reply: Boolean!
  video: VideoCreateOneWithoutCommentsInput
  user: UserCreateOneWithoutCommentsInput
  replies: CommentCreateManyInput
}

input CommentCreateManyInput {
  create: [CommentCreateInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutUserInput {
  create: [CommentCreateWithoutUserInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutVideoInput {
  create: [CommentCreateWithoutVideoInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateWithoutUserInput {
  text: String!
  reply: Boolean!
  video: VideoCreateOneWithoutCommentsInput
  replies: CommentCreateManyInput
}

input CommentCreateWithoutVideoInput {
  text: String!
  reply: Boolean!
  user: UserCreateOneWithoutCommentsInput
  replies: CommentCreateManyInput
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  text_ASC
  text_DESC
  reply_ASC
  reply_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  text: String!
  reply: Boolean!
  createdAt: DateTime!
}

input CommentScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  reply: Boolean
  reply_not: Boolean
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [CommentScalarWhereInput!]
  OR: [CommentScalarWhereInput!]
  NOT: [CommentScalarWhereInput!]
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
  AND: [CommentSubscriptionWhereInput!]
  OR: [CommentSubscriptionWhereInput!]
  NOT: [CommentSubscriptionWhereInput!]
}

input CommentUpdateDataInput {
  text: String
  reply: Boolean
  video: VideoUpdateOneWithoutCommentsInput
  user: UserUpdateOneWithoutCommentsInput
  replies: CommentUpdateManyInput
}

input CommentUpdateInput {
  text: String
  reply: Boolean
  video: VideoUpdateOneWithoutCommentsInput
  user: UserUpdateOneWithoutCommentsInput
  replies: CommentUpdateManyInput
}

input CommentUpdateManyDataInput {
  text: String
  reply: Boolean
}

input CommentUpdateManyInput {
  create: [CommentCreateInput!]
  update: [CommentUpdateWithWhereUniqueNestedInput!]
  upsert: [CommentUpsertWithWhereUniqueNestedInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyMutationInput {
  text: String
  reply: Boolean
}

input CommentUpdateManyWithoutUserInput {
  create: [CommentCreateWithoutUserInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithoutVideoInput {
  create: [CommentCreateWithoutVideoInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutVideoInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutVideoInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput!
  data: CommentUpdateManyDataInput!
}

input CommentUpdateWithoutUserDataInput {
  text: String
  reply: Boolean
  video: VideoUpdateOneWithoutCommentsInput
  replies: CommentUpdateManyInput
}

input CommentUpdateWithoutVideoDataInput {
  text: String
  reply: Boolean
  user: UserUpdateOneWithoutCommentsInput
  replies: CommentUpdateManyInput
}

input CommentUpdateWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateDataInput!
}

input CommentUpdateWithWhereUniqueWithoutUserInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutUserDataInput!
}

input CommentUpdateWithWhereUniqueWithoutVideoInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutVideoDataInput!
}

input CommentUpsertWithWhereUniqueNestedInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateDataInput!
  create: CommentCreateInput!
}

input CommentUpsertWithWhereUniqueWithoutUserInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutUserDataInput!
  create: CommentCreateWithoutUserInput!
}

input CommentUpsertWithWhereUniqueWithoutVideoInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutVideoDataInput!
  create: CommentCreateWithoutVideoInput!
}

input CommentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  reply: Boolean
  reply_not: Boolean
  video: VideoWhereInput
  user: UserWhereInput
  replies_every: CommentWhereInput
  replies_some: CommentWhereInput
  replies_none: CommentWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [CommentWhereInput!]
  OR: [CommentWhereInput!]
  NOT: [CommentWhereInput!]
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Mutation {
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createReview(data: ReviewCreateInput!): Review!
  updateReview(data: ReviewUpdateInput!, where: ReviewWhereUniqueInput!): Review
  updateManyReviews(data: ReviewUpdateManyMutationInput!, where: ReviewWhereInput): BatchPayload!
  upsertReview(where: ReviewWhereUniqueInput!, create: ReviewCreateInput!, update: ReviewUpdateInput!): Review!
  deleteReview(where: ReviewWhereUniqueInput!): Review
  deleteManyReviews(where: ReviewWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVideo(data: VideoCreateInput!): Video!
  updateVideo(data: VideoUpdateInput!, where: VideoWhereUniqueInput!): Video
  updateManyVideos(data: VideoUpdateManyMutationInput!, where: VideoWhereInput): BatchPayload!
  upsertVideo(where: VideoWhereUniqueInput!, create: VideoCreateInput!, update: VideoUpdateInput!): Video!
  deleteVideo(where: VideoWhereUniqueInput!): Video
  deleteManyVideos(where: VideoWhereInput): BatchPayload!
  createView(data: ViewCreateInput!): View!
  updateView(data: ViewUpdateInput!, where: ViewWhereUniqueInput!): View
  updateManyViews(data: ViewUpdateManyMutationInput!, where: ViewWhereInput): BatchPayload!
  upsertView(where: ViewWhereUniqueInput!, create: ViewCreateInput!, update: ViewUpdateInput!): View!
  deleteView(where: ViewWhereUniqueInput!): View
  deleteManyViews(where: ViewWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  review(where: ReviewWhereUniqueInput!): Review
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review]!
  reviewsConnection(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ReviewConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  view(where: ViewWhereUniqueInput!): View
  views(where: ViewWhereInput, orderBy: ViewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [View]!
  viewsConnection(where: ViewWhereInput, orderBy: ViewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ViewConnection!
  node(id: ID!): Node
}

type Review {
  id: ID!
  status: ReviewStatus
  video: Video
  user: User
  createdAt: DateTime!
}

type ReviewConnection {
  pageInfo: PageInfo!
  edges: [ReviewEdge]!
  aggregate: AggregateReview!
}

input ReviewCreateInput {
  status: ReviewStatus
  video: VideoCreateOneWithoutReviewsInput
  user: UserCreateOneWithoutReviewsInput
}

input ReviewCreateManyWithoutUserInput {
  create: [ReviewCreateWithoutUserInput!]
  connect: [ReviewWhereUniqueInput!]
}

input ReviewCreateManyWithoutVideoInput {
  create: [ReviewCreateWithoutVideoInput!]
  connect: [ReviewWhereUniqueInput!]
}

input ReviewCreateWithoutUserInput {
  status: ReviewStatus
  video: VideoCreateOneWithoutReviewsInput
}

input ReviewCreateWithoutVideoInput {
  status: ReviewStatus
  user: UserCreateOneWithoutReviewsInput
}

type ReviewEdge {
  node: Review!
  cursor: String!
}

enum ReviewOrderByInput {
  id_ASC
  id_DESC
  status_ASC
  status_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ReviewPreviousValues {
  id: ID!
  status: ReviewStatus
  createdAt: DateTime!
}

input ReviewScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  status: ReviewStatus
  status_not: ReviewStatus
  status_in: [ReviewStatus!]
  status_not_in: [ReviewStatus!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ReviewScalarWhereInput!]
  OR: [ReviewScalarWhereInput!]
  NOT: [ReviewScalarWhereInput!]
}

enum ReviewStatus {
  LIKE
  DISLIKE
  NONE
}

type ReviewSubscriptionPayload {
  mutation: MutationType!
  node: Review
  updatedFields: [String!]
  previousValues: ReviewPreviousValues
}

input ReviewSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ReviewWhereInput
  AND: [ReviewSubscriptionWhereInput!]
  OR: [ReviewSubscriptionWhereInput!]
  NOT: [ReviewSubscriptionWhereInput!]
}

input ReviewUpdateInput {
  status: ReviewStatus
  video: VideoUpdateOneWithoutReviewsInput
  user: UserUpdateOneWithoutReviewsInput
}

input ReviewUpdateManyDataInput {
  status: ReviewStatus
}

input ReviewUpdateManyMutationInput {
  status: ReviewStatus
}

input ReviewUpdateManyWithoutUserInput {
  create: [ReviewCreateWithoutUserInput!]
  delete: [ReviewWhereUniqueInput!]
  connect: [ReviewWhereUniqueInput!]
  disconnect: [ReviewWhereUniqueInput!]
  update: [ReviewUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ReviewUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ReviewScalarWhereInput!]
  updateMany: [ReviewUpdateManyWithWhereNestedInput!]
}

input ReviewUpdateManyWithoutVideoInput {
  create: [ReviewCreateWithoutVideoInput!]
  delete: [ReviewWhereUniqueInput!]
  connect: [ReviewWhereUniqueInput!]
  disconnect: [ReviewWhereUniqueInput!]
  update: [ReviewUpdateWithWhereUniqueWithoutVideoInput!]
  upsert: [ReviewUpsertWithWhereUniqueWithoutVideoInput!]
  deleteMany: [ReviewScalarWhereInput!]
  updateMany: [ReviewUpdateManyWithWhereNestedInput!]
}

input ReviewUpdateManyWithWhereNestedInput {
  where: ReviewScalarWhereInput!
  data: ReviewUpdateManyDataInput!
}

input ReviewUpdateWithoutUserDataInput {
  status: ReviewStatus
  video: VideoUpdateOneWithoutReviewsInput
}

input ReviewUpdateWithoutVideoDataInput {
  status: ReviewStatus
  user: UserUpdateOneWithoutReviewsInput
}

input ReviewUpdateWithWhereUniqueWithoutUserInput {
  where: ReviewWhereUniqueInput!
  data: ReviewUpdateWithoutUserDataInput!
}

input ReviewUpdateWithWhereUniqueWithoutVideoInput {
  where: ReviewWhereUniqueInput!
  data: ReviewUpdateWithoutVideoDataInput!
}

input ReviewUpsertWithWhereUniqueWithoutUserInput {
  where: ReviewWhereUniqueInput!
  update: ReviewUpdateWithoutUserDataInput!
  create: ReviewCreateWithoutUserInput!
}

input ReviewUpsertWithWhereUniqueWithoutVideoInput {
  where: ReviewWhereUniqueInput!
  update: ReviewUpdateWithoutVideoDataInput!
  create: ReviewCreateWithoutVideoInput!
}

input ReviewWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  status: ReviewStatus
  status_not: ReviewStatus
  status_in: [ReviewStatus!]
  status_not_in: [ReviewStatus!]
  video: VideoWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ReviewWhereInput!]
  OR: [ReviewWhereInput!]
  NOT: [ReviewWhereInput!]
}

input ReviewWhereUniqueInput {
  id: ID
}

enum Role {
  USER
  ADMIN
}

type Subscription {
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  review(where: ReviewSubscriptionWhereInput): ReviewSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
  view(where: ViewSubscriptionWhereInput): ViewSubscriptionPayload
}

type User {
  id: ID!
  googleID: String!
  email: String!
  name: String!
  image: String!
  googlePhotoAT: String
  googlePhotoRT: String
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
  views(where: ViewWhereInput, orderBy: ViewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [View!]
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review!]
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  role: Role!
  createdAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  googleID: String!
  email: String!
  name: String!
  image: String!
  googlePhotoAT: String
  googlePhotoRT: String
  videos: VideoCreateManyWithoutUserInput
  views: ViewCreateManyWithoutUserInput
  reviews: ReviewCreateManyWithoutUserInput
  comments: CommentCreateManyWithoutUserInput
  role: Role!
}

input UserCreateOneWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutReviewsInput {
  create: UserCreateWithoutReviewsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutVideosInput {
  create: UserCreateWithoutVideosInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutViewsInput {
  create: UserCreateWithoutViewsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCommentsInput {
  googleID: String!
  email: String!
  name: String!
  image: String!
  googlePhotoAT: String
  googlePhotoRT: String
  videos: VideoCreateManyWithoutUserInput
  views: ViewCreateManyWithoutUserInput
  reviews: ReviewCreateManyWithoutUserInput
  role: Role!
}

input UserCreateWithoutReviewsInput {
  googleID: String!
  email: String!
  name: String!
  image: String!
  googlePhotoAT: String
  googlePhotoRT: String
  videos: VideoCreateManyWithoutUserInput
  views: ViewCreateManyWithoutUserInput
  comments: CommentCreateManyWithoutUserInput
  role: Role!
}

input UserCreateWithoutVideosInput {
  googleID: String!
  email: String!
  name: String!
  image: String!
  googlePhotoAT: String
  googlePhotoRT: String
  views: ViewCreateManyWithoutUserInput
  reviews: ReviewCreateManyWithoutUserInput
  comments: CommentCreateManyWithoutUserInput
  role: Role!
}

input UserCreateWithoutViewsInput {
  googleID: String!
  email: String!
  name: String!
  image: String!
  googlePhotoAT: String
  googlePhotoRT: String
  videos: VideoCreateManyWithoutUserInput
  reviews: ReviewCreateManyWithoutUserInput
  comments: CommentCreateManyWithoutUserInput
  role: Role!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  googleID_ASC
  googleID_DESC
  email_ASC
  email_DESC
  name_ASC
  name_DESC
  image_ASC
  image_DESC
  googlePhotoAT_ASC
  googlePhotoAT_DESC
  googlePhotoRT_ASC
  googlePhotoRT_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  googleID: String!
  email: String!
  name: String!
  image: String!
  googlePhotoAT: String
  googlePhotoRT: String
  role: Role!
  createdAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  googleID: String
  email: String
  name: String
  image: String
  googlePhotoAT: String
  googlePhotoRT: String
  videos: VideoUpdateManyWithoutUserInput
  views: ViewUpdateManyWithoutUserInput
  reviews: ReviewUpdateManyWithoutUserInput
  comments: CommentUpdateManyWithoutUserInput
  role: Role
}

input UserUpdateManyMutationInput {
  googleID: String
  email: String
  name: String
  image: String
  googlePhotoAT: String
  googlePhotoRT: String
  role: Role
}

input UserUpdateOneWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  update: UserUpdateWithoutCommentsDataInput
  upsert: UserUpsertWithoutCommentsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutReviewsInput {
  create: UserCreateWithoutReviewsInput
  update: UserUpdateWithoutReviewsDataInput
  upsert: UserUpsertWithoutReviewsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutVideosInput {
  create: UserCreateWithoutVideosInput
  update: UserUpdateWithoutVideosDataInput
  upsert: UserUpsertWithoutVideosInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutViewsInput {
  create: UserCreateWithoutViewsInput
  update: UserUpdateWithoutViewsDataInput
  upsert: UserUpsertWithoutViewsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutCommentsDataInput {
  googleID: String
  email: String
  name: String
  image: String
  googlePhotoAT: String
  googlePhotoRT: String
  videos: VideoUpdateManyWithoutUserInput
  views: ViewUpdateManyWithoutUserInput
  reviews: ReviewUpdateManyWithoutUserInput
  role: Role
}

input UserUpdateWithoutReviewsDataInput {
  googleID: String
  email: String
  name: String
  image: String
  googlePhotoAT: String
  googlePhotoRT: String
  videos: VideoUpdateManyWithoutUserInput
  views: ViewUpdateManyWithoutUserInput
  comments: CommentUpdateManyWithoutUserInput
  role: Role
}

input UserUpdateWithoutVideosDataInput {
  googleID: String
  email: String
  name: String
  image: String
  googlePhotoAT: String
  googlePhotoRT: String
  views: ViewUpdateManyWithoutUserInput
  reviews: ReviewUpdateManyWithoutUserInput
  comments: CommentUpdateManyWithoutUserInput
  role: Role
}

input UserUpdateWithoutViewsDataInput {
  googleID: String
  email: String
  name: String
  image: String
  googlePhotoAT: String
  googlePhotoRT: String
  videos: VideoUpdateManyWithoutUserInput
  reviews: ReviewUpdateManyWithoutUserInput
  comments: CommentUpdateManyWithoutUserInput
  role: Role
}

input UserUpsertWithoutCommentsInput {
  update: UserUpdateWithoutCommentsDataInput!
  create: UserCreateWithoutCommentsInput!
}

input UserUpsertWithoutReviewsInput {
  update: UserUpdateWithoutReviewsDataInput!
  create: UserCreateWithoutReviewsInput!
}

input UserUpsertWithoutVideosInput {
  update: UserUpdateWithoutVideosDataInput!
  create: UserCreateWithoutVideosInput!
}

input UserUpsertWithoutViewsInput {
  update: UserUpdateWithoutViewsDataInput!
  create: UserCreateWithoutViewsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  googleID: String
  googleID_not: String
  googleID_in: [String!]
  googleID_not_in: [String!]
  googleID_lt: String
  googleID_lte: String
  googleID_gt: String
  googleID_gte: String
  googleID_contains: String
  googleID_not_contains: String
  googleID_starts_with: String
  googleID_not_starts_with: String
  googleID_ends_with: String
  googleID_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  googlePhotoAT: String
  googlePhotoAT_not: String
  googlePhotoAT_in: [String!]
  googlePhotoAT_not_in: [String!]
  googlePhotoAT_lt: String
  googlePhotoAT_lte: String
  googlePhotoAT_gt: String
  googlePhotoAT_gte: String
  googlePhotoAT_contains: String
  googlePhotoAT_not_contains: String
  googlePhotoAT_starts_with: String
  googlePhotoAT_not_starts_with: String
  googlePhotoAT_ends_with: String
  googlePhotoAT_not_ends_with: String
  googlePhotoRT: String
  googlePhotoRT_not: String
  googlePhotoRT_in: [String!]
  googlePhotoRT_not_in: [String!]
  googlePhotoRT_lt: String
  googlePhotoRT_lte: String
  googlePhotoRT_gt: String
  googlePhotoRT_gte: String
  googlePhotoRT_contains: String
  googlePhotoRT_not_contains: String
  googlePhotoRT_starts_with: String
  googlePhotoRT_not_starts_with: String
  googlePhotoRT_ends_with: String
  googlePhotoRT_not_ends_with: String
  videos_every: VideoWhereInput
  videos_some: VideoWhereInput
  videos_none: VideoWhereInput
  views_every: ViewWhereInput
  views_some: ViewWhereInput
  views_none: ViewWhereInput
  reviews_every: ReviewWhereInput
  reviews_some: ReviewWhereInput
  reviews_none: ReviewWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  googleID: String
  email: String
}

type Video {
  id: ID!
  videoURL: String!
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String!
  description: String
  tags: [String!]!
  isPublished: Boolean!
  isPublic: Boolean!
  category: Category
  views(where: ViewWhereInput, orderBy: ViewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [View!]
  reviews(where: ReviewWhereInput, orderBy: ReviewOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Review!]
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
  user: User
  createdAt: DateTime!
}

type VideoConnection {
  pageInfo: PageInfo!
  edges: [VideoEdge]!
  aggregate: AggregateVideo!
}

input VideoCreateInput {
  videoURL: String!
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String!
  description: String
  tags: VideoCreatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  views: ViewCreateManyWithoutVideoInput
  reviews: ReviewCreateManyWithoutVideoInput
  comments: CommentCreateManyWithoutVideoInput
  user: UserCreateOneWithoutVideosInput
}

input VideoCreateManyWithoutUserInput {
  create: [VideoCreateWithoutUserInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateOneWithoutCommentsInput {
  create: VideoCreateWithoutCommentsInput
  connect: VideoWhereUniqueInput
}

input VideoCreateOneWithoutReviewsInput {
  create: VideoCreateWithoutReviewsInput
  connect: VideoWhereUniqueInput
}

input VideoCreateOneWithoutViewsInput {
  create: VideoCreateWithoutViewsInput
  connect: VideoWhereUniqueInput
}

input VideoCreatetagsInput {
  set: [String!]
}

input VideoCreateWithoutCommentsInput {
  videoURL: String!
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String!
  description: String
  tags: VideoCreatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  views: ViewCreateManyWithoutVideoInput
  reviews: ReviewCreateManyWithoutVideoInput
  user: UserCreateOneWithoutVideosInput
}

input VideoCreateWithoutReviewsInput {
  videoURL: String!
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String!
  description: String
  tags: VideoCreatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  views: ViewCreateManyWithoutVideoInput
  comments: CommentCreateManyWithoutVideoInput
  user: UserCreateOneWithoutVideosInput
}

input VideoCreateWithoutUserInput {
  videoURL: String!
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String!
  description: String
  tags: VideoCreatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  views: ViewCreateManyWithoutVideoInput
  reviews: ReviewCreateManyWithoutVideoInput
  comments: CommentCreateManyWithoutVideoInput
}

input VideoCreateWithoutViewsInput {
  videoURL: String!
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String!
  description: String
  tags: VideoCreatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  reviews: ReviewCreateManyWithoutVideoInput
  comments: CommentCreateManyWithoutVideoInput
  user: UserCreateOneWithoutVideosInput
}

type VideoEdge {
  node: Video!
  cursor: String!
}

enum VideoOrderByInput {
  id_ASC
  id_DESC
  videoURL_ASC
  videoURL_DESC
  thumbURL_ASC
  thumbURL_DESC
  posterURL_ASC
  posterURL_DESC
  previewURL_ASC
  previewURL_DESC
  duration_ASC
  duration_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  isPublished_ASC
  isPublished_DESC
  isPublic_ASC
  isPublic_DESC
  category_ASC
  category_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoPreviousValues {
  id: ID!
  videoURL: String!
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String!
  description: String
  tags: [String!]!
  isPublished: Boolean!
  isPublic: Boolean!
  category: Category
  createdAt: DateTime!
}

input VideoScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  videoURL: String
  videoURL_not: String
  videoURL_in: [String!]
  videoURL_not_in: [String!]
  videoURL_lt: String
  videoURL_lte: String
  videoURL_gt: String
  videoURL_gte: String
  videoURL_contains: String
  videoURL_not_contains: String
  videoURL_starts_with: String
  videoURL_not_starts_with: String
  videoURL_ends_with: String
  videoURL_not_ends_with: String
  thumbURL: String
  thumbURL_not: String
  thumbURL_in: [String!]
  thumbURL_not_in: [String!]
  thumbURL_lt: String
  thumbURL_lte: String
  thumbURL_gt: String
  thumbURL_gte: String
  thumbURL_contains: String
  thumbURL_not_contains: String
  thumbURL_starts_with: String
  thumbURL_not_starts_with: String
  thumbURL_ends_with: String
  thumbURL_not_ends_with: String
  posterURL: String
  posterURL_not: String
  posterURL_in: [String!]
  posterURL_not_in: [String!]
  posterURL_lt: String
  posterURL_lte: String
  posterURL_gt: String
  posterURL_gte: String
  posterURL_contains: String
  posterURL_not_contains: String
  posterURL_starts_with: String
  posterURL_not_starts_with: String
  posterURL_ends_with: String
  posterURL_not_ends_with: String
  previewURL: String
  previewURL_not: String
  previewURL_in: [String!]
  previewURL_not_in: [String!]
  previewURL_lt: String
  previewURL_lte: String
  previewURL_gt: String
  previewURL_gte: String
  previewURL_contains: String
  previewURL_not_contains: String
  previewURL_starts_with: String
  previewURL_not_starts_with: String
  previewURL_ends_with: String
  previewURL_not_ends_with: String
  duration: Int
  duration_not: Int
  duration_in: [Int!]
  duration_not_in: [Int!]
  duration_lt: Int
  duration_lte: Int
  duration_gt: Int
  duration_gte: Int
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  isPublished: Boolean
  isPublished_not: Boolean
  isPublic: Boolean
  isPublic_not: Boolean
  category: Category
  category_not: Category
  category_in: [Category!]
  category_not_in: [Category!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [VideoScalarWhereInput!]
  OR: [VideoScalarWhereInput!]
  NOT: [VideoScalarWhereInput!]
}

type VideoSubscriptionPayload {
  mutation: MutationType!
  node: Video
  updatedFields: [String!]
  previousValues: VideoPreviousValues
}

input VideoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoWhereInput
  AND: [VideoSubscriptionWhereInput!]
  OR: [VideoSubscriptionWhereInput!]
  NOT: [VideoSubscriptionWhereInput!]
}

input VideoUpdateInput {
  videoURL: String
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  views: ViewUpdateManyWithoutVideoInput
  reviews: ReviewUpdateManyWithoutVideoInput
  comments: CommentUpdateManyWithoutVideoInput
  user: UserUpdateOneWithoutVideosInput
}

input VideoUpdateManyDataInput {
  videoURL: String
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
}

input VideoUpdateManyMutationInput {
  videoURL: String
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
}

input VideoUpdateManyWithoutUserInput {
  create: [VideoCreateWithoutUserInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithWhereNestedInput {
  where: VideoScalarWhereInput!
  data: VideoUpdateManyDataInput!
}

input VideoUpdateOneWithoutCommentsInput {
  create: VideoCreateWithoutCommentsInput
  update: VideoUpdateWithoutCommentsDataInput
  upsert: VideoUpsertWithoutCommentsInput
  delete: Boolean
  disconnect: Boolean
  connect: VideoWhereUniqueInput
}

input VideoUpdateOneWithoutReviewsInput {
  create: VideoCreateWithoutReviewsInput
  update: VideoUpdateWithoutReviewsDataInput
  upsert: VideoUpsertWithoutReviewsInput
  delete: Boolean
  disconnect: Boolean
  connect: VideoWhereUniqueInput
}

input VideoUpdateOneWithoutViewsInput {
  create: VideoCreateWithoutViewsInput
  update: VideoUpdateWithoutViewsDataInput
  upsert: VideoUpsertWithoutViewsInput
  delete: Boolean
  disconnect: Boolean
  connect: VideoWhereUniqueInput
}

input VideoUpdatetagsInput {
  set: [String!]
}

input VideoUpdateWithoutCommentsDataInput {
  videoURL: String
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  views: ViewUpdateManyWithoutVideoInput
  reviews: ReviewUpdateManyWithoutVideoInput
  user: UserUpdateOneWithoutVideosInput
}

input VideoUpdateWithoutReviewsDataInput {
  videoURL: String
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  views: ViewUpdateManyWithoutVideoInput
  comments: CommentUpdateManyWithoutVideoInput
  user: UserUpdateOneWithoutVideosInput
}

input VideoUpdateWithoutUserDataInput {
  videoURL: String
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  views: ViewUpdateManyWithoutVideoInput
  reviews: ReviewUpdateManyWithoutVideoInput
  comments: CommentUpdateManyWithoutVideoInput
}

input VideoUpdateWithoutViewsDataInput {
  videoURL: String
  thumbURL: String
  posterURL: String
  previewURL: String
  duration: Int
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  reviews: ReviewUpdateManyWithoutVideoInput
  comments: CommentUpdateManyWithoutVideoInput
  user: UserUpdateOneWithoutVideosInput
}

input VideoUpdateWithWhereUniqueWithoutUserInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutUserDataInput!
}

input VideoUpsertWithoutCommentsInput {
  update: VideoUpdateWithoutCommentsDataInput!
  create: VideoCreateWithoutCommentsInput!
}

input VideoUpsertWithoutReviewsInput {
  update: VideoUpdateWithoutReviewsDataInput!
  create: VideoCreateWithoutReviewsInput!
}

input VideoUpsertWithoutViewsInput {
  update: VideoUpdateWithoutViewsDataInput!
  create: VideoCreateWithoutViewsInput!
}

input VideoUpsertWithWhereUniqueWithoutUserInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutUserDataInput!
  create: VideoCreateWithoutUserInput!
}

input VideoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  videoURL: String
  videoURL_not: String
  videoURL_in: [String!]
  videoURL_not_in: [String!]
  videoURL_lt: String
  videoURL_lte: String
  videoURL_gt: String
  videoURL_gte: String
  videoURL_contains: String
  videoURL_not_contains: String
  videoURL_starts_with: String
  videoURL_not_starts_with: String
  videoURL_ends_with: String
  videoURL_not_ends_with: String
  thumbURL: String
  thumbURL_not: String
  thumbURL_in: [String!]
  thumbURL_not_in: [String!]
  thumbURL_lt: String
  thumbURL_lte: String
  thumbURL_gt: String
  thumbURL_gte: String
  thumbURL_contains: String
  thumbURL_not_contains: String
  thumbURL_starts_with: String
  thumbURL_not_starts_with: String
  thumbURL_ends_with: String
  thumbURL_not_ends_with: String
  posterURL: String
  posterURL_not: String
  posterURL_in: [String!]
  posterURL_not_in: [String!]
  posterURL_lt: String
  posterURL_lte: String
  posterURL_gt: String
  posterURL_gte: String
  posterURL_contains: String
  posterURL_not_contains: String
  posterURL_starts_with: String
  posterURL_not_starts_with: String
  posterURL_ends_with: String
  posterURL_not_ends_with: String
  previewURL: String
  previewURL_not: String
  previewURL_in: [String!]
  previewURL_not_in: [String!]
  previewURL_lt: String
  previewURL_lte: String
  previewURL_gt: String
  previewURL_gte: String
  previewURL_contains: String
  previewURL_not_contains: String
  previewURL_starts_with: String
  previewURL_not_starts_with: String
  previewURL_ends_with: String
  previewURL_not_ends_with: String
  duration: Int
  duration_not: Int
  duration_in: [Int!]
  duration_not_in: [Int!]
  duration_lt: Int
  duration_lte: Int
  duration_gt: Int
  duration_gte: Int
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  isPublished: Boolean
  isPublished_not: Boolean
  isPublic: Boolean
  isPublic_not: Boolean
  category: Category
  category_not: Category
  category_in: [Category!]
  category_not_in: [Category!]
  views_every: ViewWhereInput
  views_some: ViewWhereInput
  views_none: ViewWhereInput
  reviews_every: ReviewWhereInput
  reviews_some: ReviewWhereInput
  reviews_none: ReviewWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [VideoWhereInput!]
  OR: [VideoWhereInput!]
  NOT: [VideoWhereInput!]
}

input VideoWhereUniqueInput {
  id: ID
}

type View {
  id: ID!
  complete: Boolean
  progress: Int
  video: Video
  user: User
  createdAt: DateTime!
}

type ViewConnection {
  pageInfo: PageInfo!
  edges: [ViewEdge]!
  aggregate: AggregateView!
}

input ViewCreateInput {
  complete: Boolean
  progress: Int
  video: VideoCreateOneWithoutViewsInput
  user: UserCreateOneWithoutViewsInput
}

input ViewCreateManyWithoutUserInput {
  create: [ViewCreateWithoutUserInput!]
  connect: [ViewWhereUniqueInput!]
}

input ViewCreateManyWithoutVideoInput {
  create: [ViewCreateWithoutVideoInput!]
  connect: [ViewWhereUniqueInput!]
}

input ViewCreateWithoutUserInput {
  complete: Boolean
  progress: Int
  video: VideoCreateOneWithoutViewsInput
}

input ViewCreateWithoutVideoInput {
  complete: Boolean
  progress: Int
  user: UserCreateOneWithoutViewsInput
}

type ViewEdge {
  node: View!
  cursor: String!
}

enum ViewOrderByInput {
  id_ASC
  id_DESC
  complete_ASC
  complete_DESC
  progress_ASC
  progress_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ViewPreviousValues {
  id: ID!
  complete: Boolean
  progress: Int
  createdAt: DateTime!
}

input ViewScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  complete: Boolean
  complete_not: Boolean
  progress: Int
  progress_not: Int
  progress_in: [Int!]
  progress_not_in: [Int!]
  progress_lt: Int
  progress_lte: Int
  progress_gt: Int
  progress_gte: Int
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ViewScalarWhereInput!]
  OR: [ViewScalarWhereInput!]
  NOT: [ViewScalarWhereInput!]
}

type ViewSubscriptionPayload {
  mutation: MutationType!
  node: View
  updatedFields: [String!]
  previousValues: ViewPreviousValues
}

input ViewSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ViewWhereInput
  AND: [ViewSubscriptionWhereInput!]
  OR: [ViewSubscriptionWhereInput!]
  NOT: [ViewSubscriptionWhereInput!]
}

input ViewUpdateInput {
  complete: Boolean
  progress: Int
  video: VideoUpdateOneWithoutViewsInput
  user: UserUpdateOneWithoutViewsInput
}

input ViewUpdateManyDataInput {
  complete: Boolean
  progress: Int
}

input ViewUpdateManyMutationInput {
  complete: Boolean
  progress: Int
}

input ViewUpdateManyWithoutUserInput {
  create: [ViewCreateWithoutUserInput!]
  delete: [ViewWhereUniqueInput!]
  connect: [ViewWhereUniqueInput!]
  disconnect: [ViewWhereUniqueInput!]
  update: [ViewUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ViewUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ViewScalarWhereInput!]
  updateMany: [ViewUpdateManyWithWhereNestedInput!]
}

input ViewUpdateManyWithoutVideoInput {
  create: [ViewCreateWithoutVideoInput!]
  delete: [ViewWhereUniqueInput!]
  connect: [ViewWhereUniqueInput!]
  disconnect: [ViewWhereUniqueInput!]
  update: [ViewUpdateWithWhereUniqueWithoutVideoInput!]
  upsert: [ViewUpsertWithWhereUniqueWithoutVideoInput!]
  deleteMany: [ViewScalarWhereInput!]
  updateMany: [ViewUpdateManyWithWhereNestedInput!]
}

input ViewUpdateManyWithWhereNestedInput {
  where: ViewScalarWhereInput!
  data: ViewUpdateManyDataInput!
}

input ViewUpdateWithoutUserDataInput {
  complete: Boolean
  progress: Int
  video: VideoUpdateOneWithoutViewsInput
}

input ViewUpdateWithoutVideoDataInput {
  complete: Boolean
  progress: Int
  user: UserUpdateOneWithoutViewsInput
}

input ViewUpdateWithWhereUniqueWithoutUserInput {
  where: ViewWhereUniqueInput!
  data: ViewUpdateWithoutUserDataInput!
}

input ViewUpdateWithWhereUniqueWithoutVideoInput {
  where: ViewWhereUniqueInput!
  data: ViewUpdateWithoutVideoDataInput!
}

input ViewUpsertWithWhereUniqueWithoutUserInput {
  where: ViewWhereUniqueInput!
  update: ViewUpdateWithoutUserDataInput!
  create: ViewCreateWithoutUserInput!
}

input ViewUpsertWithWhereUniqueWithoutVideoInput {
  where: ViewWhereUniqueInput!
  update: ViewUpdateWithoutVideoDataInput!
  create: ViewCreateWithoutVideoInput!
}

input ViewWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  complete: Boolean
  complete_not: Boolean
  progress: Int
  progress_not: Int
  progress_in: [Int!]
  progress_not_in: [Int!]
  progress_lt: Int
  progress_lte: Int
  progress_gt: Int
  progress_gte: Int
  video: VideoWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ViewWhereInput!]
  OR: [ViewWhereInput!]
  NOT: [ViewWhereInput!]
}

input ViewWhereUniqueInput {
  id: ID
}
`
      }
    