import { gql } from "apollo-server-express";

const jobTypeDefs = gql`
  enum JobType {
    fullTime
    partTime
    remote
    hybrid
  }

  type Job {
    id: ID!
    title: String!
    description: String!
    location: String!
    type: JobType!
    isActive: Boolean!
    companyId: ID!
    postedBy: ID!
    createdAt: String
    updatedAt: String
  }

  input CreateJobInput {
    title: String!
    description: String!
    location: String!
    type: JobType!
    companyId: ID!
    isActive: Boolean
  }

  input UpdateJobInput {
    title: String
    description: String
    location: String
    type: JobType
    isActive: Boolean
  }

  type Query {
    getAllJobs: [Job]
    getJobById(id: ID!): Job
    getJobsByCompany(companyId: ID!): [Job]
  }

  type Mutation {
    createJob(input: CreateJobInput!): Job
    updateJob(id: ID!, input: UpdateJobInput!): Job
    deleteJob(id: ID!): Boolean
  }
`;

export default jobTypeDefs;
