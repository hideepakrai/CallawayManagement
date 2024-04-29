import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_Manager_ACCOUNT = gql`
  query getUserAccount($userId: ID!) {
    usersPermissionsUsers(filters: { id: { eq: $userId } }) {
      data {
        attributes {
          username
          email
          provider
          role {
            data {
              id
              attributes {
                name
              }
            }
          }
          Details {
            ... on ComponentUsersManager {
              id
              Sales {
                data {
                  id
                  attributes {
                    username
                    email
                  }
                }
              }
              Retailers {
                data {
                  id
                  attributes {
                    username
                    email
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