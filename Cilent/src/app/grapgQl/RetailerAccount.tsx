import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_Retailer_ACCOUNT = gql`
  query gerRetailAccount($userId: ID!) {
    retailers(filters: { id: { eq:$userId} }) {
      data{
        id
        attributes{
          Name
          Email
          managers{
            data{
              id
              attributes{
                Name
                Email
                Address
                users_permissions_user{
                  data{
                    id
                    attributes{
                      username
                      email
                    }
                  }
                }
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
                
                 users_permissions_user{
                  data{
                    id
                    attributes{
                      username
                    }
                  }
                }
                
              }
            }
          }
        }
      }
    }
  }
`;