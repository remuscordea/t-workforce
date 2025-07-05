# docs/graphql-schema.md

## Tipuri principale (GraphQL)

### User

```graphql
type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  createdAt: String
  updatedAt: String
}
```

### Candidate

```graphql
type Candidate {
  id: ID!
  userId: ID!
  bio: String
  cvUrl: String
  createdAt: String
  updatedAt: String
}
```

### Company

```graphql
type Company {
  id: ID!
  name: String!
  description: String
  slug: String
  userId: ID!
  createdAt: String
  updatedAt: String
}
```

### Job

```graphql
enum JobType {
  FULL_TIME
  PART_TIME
  REMOTE
  HYBRID
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
```

### Application

```graphql
enum ApplicationStatus {
  PENDING
  REVIEWED
  ACCEPTED
  REJECTED
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
```

### Bookmark

```graphql
type Bookmark {
  id: ID!
  candidateId: ID!
  jobId: ID!
  createdAt: String
  updatedAt: String
}
```

## Autentificare

```graphql
type AuthPayload {
  token: String!
  user: User!
}

input LoginInput {
  email: String!
  password: String!
}

input RegisterInput {
  name: String!
  email: String!
  password: String!
  role: String!
}
```

## Operații disponibile (exemple)

```graphql
# Autentificare
mutation {
  login(input: { email: "a@a.com", password: "1234" }) {
    token
    user { id name role }
  }
}

# Creare job
mutation {
  createJob(input: {
    title: "Frontend Developer"
    description: "React + TS"
    location: "Remote"
    type: FULL_TIME
    companyId: "..."
    postedBy: "..."
  }) {
    id
    title
  }
}
```

**Note:** toate mutațiile care presupun date protejate necesită token JWT valid, trecut in header: `Authorization: Bearer <token>`

