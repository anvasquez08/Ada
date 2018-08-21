import React from 'react';
import {gql} from "apollo-boost";
import { graphql,  Query, Mutation , withApollo} from "react-apollo";

const GET_ALL_INVENTORY= gql`
  query {
    inventories {
      id
      name
      brandName
      labels {
        key
      }
    }
    inventory @client 
  }
`;

const GetInventory = () => (
  <Query query={GET_ALL_INVENTORY}>
  {({data, loading, error}) => (
    <GetInventoryView
      data={data}
      loading={loading}
      error={error}/>
  )}
</Query>
)

const GetInventoryView = ({data, loading, error, client}) => {
  if (loading) return (<div>"Loading..."</div>)
  if (error) return (<div>`Error: ${error.message}`</div>);
  console.log('this is the data', data)
  return (
      <div>
        {
          data.inventories.map((item) => {
            return (
              <div key={item.id}>{item.name}</div>
            )
          })
        }
      </div>
  )
}

export default graphql(GET_ALL_INVENTORY)(GetInventory)