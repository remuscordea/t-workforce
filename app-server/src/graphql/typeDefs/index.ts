import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDefs from "./user";
import companyTypeDefs from "./company";
import candidateTypeDefs from "./candidate";
import jobTypeDefs from "./job";
import applicationTypeDefs from "./application";
import bookmarkTypeDefs from "./bookmark";

const typesArray = [
  userTypeDefs,
  companyTypeDefs,
  candidateTypeDefs,
  jobTypeDefs,
  applicationTypeDefs,
  bookmarkTypeDefs,
];

const mergedTypeDefs = mergeTypeDefs(typesArray);

export default mergedTypeDefs;
