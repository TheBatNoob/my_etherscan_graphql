const { ApolloServer } = require("apollo-server"); // Import ApolloServer from Apollo Server module
const { importSchema } = require("graphql-import"); // Import importSchema function from graphql-import module
const EtherDataSource = require("./datasource/ethDatasource"); // Import EtherDataSource from local file

const typeDefs = importSchema("./schema.graphql"); // Load GraphQL schema from file

require("dotenv").config(); // Load environment variables

// Define resolvers with comments
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Get ether balance by address
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Get latest Ethereum price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs, // Load GraphQL schema from file
  resolvers, // Define resolvers for GraphQL queries
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Create data source for Ethereum
  }),
});

server.timeout = 0; // Set server timeout to 0 to disable it
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`) // Start the server on port 9000
});
