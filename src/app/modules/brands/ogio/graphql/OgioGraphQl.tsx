
import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_OGIO_Prduct = gql`
query allProducts {
    products(filters: { SetType: { eq: "Ogio" } }){
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
            ... on ComponentAttributeSetOgio{
              id
              ProductType
              Category
              ProductModel
              LifeCycle
              
            }
            
          }
    
              
            }
            
          }
        }
      }
  `
  
  