
import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_User_ACCOUNT = gql`
  query getUserAccount($userId: ID!) {
    usersPermissionsUsers(filters: { id: { eq: $userId } }
      pagination:{limit:-1}
    ) {
data{
    id
    attributes{
      username
      email
      role{
        data{
          id
          attributes{
            name
          }
        }
      }
      manager{
        data{
          id
          attributes{
            Name
            Email
          
          }
        }
      }
      
      retailer{
        data{
          id
          attributes{
            Name
            Email
          }
        }
      }
      sales_representative{
        data{
          id
          attributes{
            Name
            Email
          }
        }
      }
    }
  }
}
}

  `