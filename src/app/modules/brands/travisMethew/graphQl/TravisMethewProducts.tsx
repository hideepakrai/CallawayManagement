


import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_TRAVISMETHEW_Prduct = gql`
query getTravisMAthewProduct {
  products(filters:{ SetType: { eq: "Travis Methew" } }){
    data{
      id
      attributes{
        brand{
          data{
            attributes{
              Name
            }
          }
        }
        Name
        Description
        SKU
        SetType
        ProductType
        SalePrice
       AttributeSet{
        ... on ComponentAttributeSetTravisMathew{
          StyleCode
          Length
          Category
          Season
          Line
          Color
          ColorCode
          Size 
          Stock88
         Stock90
          
    
        }
      }
       
        
  
            
          }
          
        }
      }
    }
`