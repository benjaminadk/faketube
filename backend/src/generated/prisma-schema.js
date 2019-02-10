module.exports = {
        typeDefs: /* GraphQL */ `type AggregateUser {
  count: Int!
}

type AggregateVideo {
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

scalar DateTime

scalar Long

type Mutation {
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
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  node(id: ID!): Node
}

enum Role {
  USER
  ADMIN
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
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
  role: Role!
}

input UserCreateOneWithoutVideosInput {
  create: UserCreateWithoutVideosInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutVideosInput {
  googleID: String!
  email: String!
  name: String!
  image: String!
  googlePhotoAT: String
  googlePhotoRT: String
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

input UserUpdateOneWithoutVideosInput {
  create: UserCreateWithoutVideosInput
  update: UserUpdateWithoutVideosDataInput
  upsert: UserUpsertWithoutVideosInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutVideosDataInput {
  googleID: String
  email: String
  name: String
  image: String
  googlePhotoAT: String
  googlePhotoRT: String
  role: Role
}

input UserUpsertWithoutVideosInput {
  update: UserUpdateWithoutVideosDataInput!
  create: UserCreateWithoutVideosInput!
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
  imageURL: String
  title: String!
  description: String
  tags: [String!]!
  isPublished: Boolean!
  isPublic: Boolean!
  category: Category
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
  imageURL: String
  title: String!
  description: String
  tags: VideoCreatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  user: UserCreateOneWithoutVideosInput
}

input VideoCreateManyWithoutUserInput {
  create: [VideoCreateWithoutUserInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreatetagsInput {
  set: [String!]
}

input VideoCreateWithoutUserInput {
  videoURL: String!
  imageURL: String
  title: String!
  description: String
  tags: VideoCreatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
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
  imageURL_ASC
  imageURL_DESC
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
  imageURL: String
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
  imageURL: String
  imageURL_not: String
  imageURL_in: [String!]
  imageURL_not_in: [String!]
  imageURL_lt: String
  imageURL_lte: String
  imageURL_gt: String
  imageURL_gte: String
  imageURL_contains: String
  imageURL_not_contains: String
  imageURL_starts_with: String
  imageURL_not_starts_with: String
  imageURL_ends_with: String
  imageURL_not_ends_with: String
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
  imageURL: String
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
  user: UserUpdateOneWithoutVideosInput
}

input VideoUpdateManyDataInput {
  videoURL: String
  imageURL: String
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
}

input VideoUpdateManyMutationInput {
  videoURL: String
  imageURL: String
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

input VideoUpdatetagsInput {
  set: [String!]
}

input VideoUpdateWithoutUserDataInput {
  videoURL: String
  imageURL: String
  title: String
  description: String
  tags: VideoUpdatetagsInput
  isPublished: Boolean
  isPublic: Boolean
  category: Category
}

input VideoUpdateWithWhereUniqueWithoutUserInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutUserDataInput!
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
  imageURL: String
  imageURL_not: String
  imageURL_in: [String!]
  imageURL_not_in: [String!]
  imageURL_lt: String
  imageURL_lte: String
  imageURL_gt: String
  imageURL_gte: String
  imageURL_contains: String
  imageURL_not_contains: String
  imageURL_starts_with: String
  imageURL_not_starts_with: String
  imageURL_ends_with: String
  imageURL_not_ends_with: String
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
`
      }
    