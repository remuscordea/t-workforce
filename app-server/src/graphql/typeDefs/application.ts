import { gql } from "apollo-server-express";

const applicationTypeDefs = gql`
  enum ApplicationStatus {
    pending
    in_review
    interview
    rejected
    accepted
  }

  type Application {
    id: ID!
    candidateId: ID!
    jobId: ID!
    status: ApplicationStatus!
    notes: String
    createdAt: String
    updatedAt: String
  }

  input CreateApplicationInput {
    candidateId: ID!
    jobId: ID!
    notes: String
  }

  input UpdateApplicationStatusInput {
    applicationId: ID!
    status: ApplicationStatus!
    notes: String
  }

  type Query {
    getApplications: [Application]
    getApplicationById(id: ID!): Application
    getApplicationsByJob(jobId: ID!): [Application]
    getApplicationsByCandidate(candidateId: ID!): [Application]
  }

  type Mutation {
    createApplication(input: CreateApplicationInput!): Application!
    updateApplicationStatus(input: UpdateApplicationStatusInput!): Application!
  }
`;

export default applicationTypeDefs;
