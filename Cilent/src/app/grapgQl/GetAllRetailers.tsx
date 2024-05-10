import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_All_Retailer = gql`
query getRetailer{
    retailers{
      data{
        id
        attributes{
          Name
          Address
          Phone
          Phone2
          GST
          Email
          Type
          Location
          Website
          sales_representatives{
            data{
              id
              attributes{
                Name
              }
            }
          }
          managers{
            data{
              id
              attributes{
                Name
              }
            }
          }
         
        }
      }
    }
  }
  `