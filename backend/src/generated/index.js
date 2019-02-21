"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Category",
    embedded: false
  },
  {
    name: "Comment",
    embedded: false
  },
  {
    name: "CommentReview",
    embedded: false
  },
  {
    name: "Playlist",
    embedded: false
  },
  {
    name: "Review",
    embedded: false
  },
  {
    name: "ReviewStatus",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Video",
    embedded: false
  },
  {
    name: "View",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
