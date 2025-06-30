import { gql } from "apollo-server-express";

const bookmarkTypeDefs = gql`
  type Bookmark {
    id: ID!
    candidateId: ID!
    jobId: ID!
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getBookmarksByCandidate: [Bookmark]
  }

  extend type Mutation {
    addBookmark(jobId: ID!): Bookmark
    removeBookmark(jobId: ID!): Boolean
  }
`;

export default bookmarkTypeDefs;
