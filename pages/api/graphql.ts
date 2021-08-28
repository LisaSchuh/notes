import { NextApiRequest, NextApiResponse } from "next"
import { Neo4jGraphQL } from "@neo4j/graphql";
import { ApolloServer } from "apollo-server-micro";
import neo4j from "neo4j-driver";

// (You may need to replace your connection details, username and password)
const AURA_ENDPOINT = 'CONFIG_AURA_ENDPOINT';
const USERNAME = 'CONFIG_AURA_USERNAME';
const PASSWORD = 'CONFIG_AURA_PASSWORD';

// Create Neo4j driver instance
const driver = neo4j.driver(AURA_ENDPOINT, neo4j.auth.basic(USERNAME, PASSWORD), {encrypted:true, trust:'TRUST_SYSTEM_CA_SIGNED_CERTIFICATES'});

const typeDefs = `
  type Query {
    tags: [Tag!]!
  }
  type Tag {
    name: String
  }
`;

// Create instance that contains executable GraphQL schema from GraphQL type definitions
const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver
});

// Create ApolloServer instance to serve GraphQL schema
const apolloServer = new ApolloServer({
  schema: neoSchema.schema
});

const startServer = apolloServer.start()

export default async function handler(  req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await (apolloServer as any).createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}