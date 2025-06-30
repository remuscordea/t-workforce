import { gql } from "apollo-server-express";

const companyTypeDefs = gql`
  type Company {
    id: ID!
    name: String!
    description: String
    website: String
    industry: String
    logoUrl: String
    slug: String!
    user: ID!
    createdAt: String
    updatedAt: String
  }

  input CreateCompanyInput {
    name: String!
    description: String
    website: String
    industry: String
    logoUrl: String
  }

  input UpdateCompanyInput {
    name: String
    description: String
    website: String
    industry: String
    logoUrl: String
  }

  type Query {
    myCompany: Company
    getCompanyBySlug(slug: String!): Company
  }

  type Mutation {
    createCompany(input: CreateCompanyInput!): Company!
    updateCompany(input: UpdateCompanyInput!): Company!
  }
`;

export default companyTypeDefs;
