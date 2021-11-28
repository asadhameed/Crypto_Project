import express from 'express';
import { ApolloServer } from 'apollo-server'

import typeDefs  from './schemas/coinSchema'
import CoinApi from './datasources/coinAPI'
import resolvers from './resolvers/resolvers'

const server = new ApolloServer({ typeDefs, resolvers, dataSources:()=>({
   coinApi: new CoinApi()
}) });

server.listen().then(() => {
  console.log(`
    Server is running!
    Listening on port 4000
    Explore at https://studio.apollographql.com/sandbox
  `);
});