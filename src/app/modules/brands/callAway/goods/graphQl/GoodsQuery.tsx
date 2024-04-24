
import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_Callaway_Goods_Prduct = gql`
query callAwaYGoods {
    products(filters: { SetType: { eq: "callaway Goods" } }){
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
          StockManagement
          StockStatus
          RegularPrice
          SalePrice
          StockAvailable88
          StockAvailable90
          SetType
          ProductType
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
            ... on ComponentAttributeSetEquipment{
              ProductType
              ProductModel
              Category
              Orientation
              LifeCycle
            }
          }
      
            }
            
          }
        }
      }
      `