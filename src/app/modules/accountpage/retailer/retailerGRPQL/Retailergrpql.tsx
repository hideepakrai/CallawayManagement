import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Define your GraphQL query
export const GET_ALL_RETAILERS= gql`
query getRetailer{
    retailers{
        data{
            id
            attributes{
              Name
              Email
              Address
              Phone
              Phone2
              GST
              sales_representatives{
                data{
                  id
                  attributes{
                    Name
                    Address
                    Email
                    Phone
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
              managers{
                data{
                  id
                  attributes{
                    Name
                    Address
                    Email
                    Phone
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
            }
          }
    }
  }
  `