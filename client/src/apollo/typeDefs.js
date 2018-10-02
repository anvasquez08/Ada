import gql from "graphql-tag";

export const typeDefs = gql`
  type Inventory {
    id: ID! 
    name: String
    brandName: String
    url: String
    imageUrl: String
    price: Float
    createdAt: String
    labels: [Label]
    boolean: Boolean
  }

  type Label{
    id: ID
    key: String
  }

  type Query {
    hello: String
    inventory: Inventory
    inventories(where: String): [Inventory]

  }

  type Mutation {
    filterInventory(brandName: String): Inventory
  }

`;