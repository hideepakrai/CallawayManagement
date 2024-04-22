


import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_TRAVISMETHEW_Prduct = gql`
query getTravisMAthewProduct {
    products(filters:{ SetType: { eq: "Travis Methew" } }){
      data{
        id
        attributes{
          Name
          Description
          SKU
          StockManagement
          StockStatus
          RegularPrice
          SalePrice
          StockAvailable
          SetType
          ProductType
         AttributeSet{
          ... on ComponentAttributeSetTravisMathew{
            StyleCode
            Length
            Category
            Season
            Line
            Color
            ColorCode
      
          }
        }
         
          
    
              
            }
            
          }
        }
      }
`