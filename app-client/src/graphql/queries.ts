import { gql } from '@apollo/client';

export const GET_JOBS = gql`
  query GetJobs {
    getAllJobs {
      id
      title
      description
      location
      type
      createdAt
    }
  }
`;
