import { gql } from "apollo-server-express";

const candidateTypeDefs = gql`
  type Candidate {
    id: ID!
    userId: ID!
    phone: String
    location: String
    experienceLevel: String
    skills: [String]
    languages: [String]
    education: String
    cvUrl: String
    isActive: Boolean!
    createdAt: String
    updatedAt: String
  }

  input CreateCandidateInput {
    phone: String
    location: String
    experienceLevel: String
    skills: [String]
    languages: [String]
    education: String
    cvUrl: String
  }

  type Query {
    getCandidateById(id: ID!): Candidate
    getMyCandidateProfile: Candidate
  }

  type Mutation {
    createCandidate(input: CreateCandidateInput!): Candidate!
    updateMyCandidateProfile(input: CreateCandidateInput!): Candidate!
  }
`;

export default candidateTypeDefs;
