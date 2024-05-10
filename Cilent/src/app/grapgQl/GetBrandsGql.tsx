import React from 'react';
import { useQuery, gql } from '@apollo/client';


export const GET_All_BRANDS = gql`
query allBrands{
    brands{
      data{
        id
        attributes{
        Name
          Description
          Logo{
            data{
              id
              attributes{
                formats
              }
            }
          }
        }
      }
    }
  }`