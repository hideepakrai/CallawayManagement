import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_User_Order = gql`
  query getUserAccount($userId: ID!) {
    usersPermissionsUsers(filters: { id: { eq: $userId } }) {
      data{
        id
        attributes{
            
              orders{
                data{
                  id
                  attributes{
                    OrderId
                    Brand
                    Amount
                    DiscountType
                    DiscountPercent
                    ProductDetails{
                      product{
                        data{
                          id
                          attributes{
                            Name
                            SKU
                            Description
                            AttributeSet{
                              ... on ComponentAttributeSetTravisMathew{
                                Category
                                Season
                              }
                            }
                            
                          
                          }
                        }
                      }
                      UnitPrice
                      Qty88
                      Qty90
                      TotalPrice
                      
                    }
                    retailer{
                      data{
                        id
                        attributes{
                          Name
                          Address
                        
                        }
                      }
                    }
                    Status
                    createdAt
                  }
                }
              }
        }
      }
    }
    }`