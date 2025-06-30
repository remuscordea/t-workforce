import { mergeResolvers } from "@graphql-tools/merge";

import userResolvers from "./user";
import companyResolvers from "./company";
import candidateResolvers from "./candidate";
import jobResolvers from "./job";
import applicationResolvers from "./application";
import bookmarkResolvers from "./bookmark";

const resolversArray = [
  userResolvers,
  companyResolvers,
  candidateResolvers,
  jobResolvers,
  applicationResolvers,
  bookmarkResolvers,
];

const resolvers = mergeResolvers(resolversArray);

export default resolvers;
