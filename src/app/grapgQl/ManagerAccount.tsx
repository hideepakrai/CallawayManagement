import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_Manager_ACCOUNT = gql`
query getManagerAccount($userId: ID!) {
managers(filters: { id: { eq: $userId } }) {
  data{
    id
    attributes{
      Name
      Email
      retailers{
        data{
          id
          attributes{
            Name
            Email
            Address
            Location
            GST
          }
        }
      }
      sales_representatives{
        data{
          id
          attributes{
            Name
            Email
            Address
            
            
          }
        }
      }
    }
  }
}
}
`;