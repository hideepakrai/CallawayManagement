


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
        MRP
        products{
          data
          {
            id
            attributes{
              Name
              Description
              SKU
              SetType
              MRP
               Gallery{
          data{
            id
            attributes{
              formats
            }
          }
        }
              
                 AttributeSet{
          ... on ComponentAttributeSetTravisMathew{
            Season
            Category
            Length
            Line
            Color
            ColorCode
            Size
            Gender
            Stock88
            Stock90
            StyleCode
            
          }
        }
              
            }
          }
        }
        Gallery{
          data{
            id
            attributes{
              formats
            }
          }
        }
        PrimaryImage{
          data{
            id
            attributes{
              formats
            }
          }
        }
        AttributeSet{
          ... on ComponentAttributeSetTravisMathew{
            Season
            Category
            Length
            Line
            Color
            ColorCode
            Size
            Gender
            Stock88
            Stock90
            StyleCode
            
          }
        }
       
            
          }
          
        }
      }
    }
`