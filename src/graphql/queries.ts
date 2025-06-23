
import { gql } from '@apollo/client';

// Query to fetch experience data from Shopify metaobjects
export const GET_EXPERIENCE_METAOBJECTS = gql`
  query GetExperienceMetaobjects {
    metaobjects(type: "experience", first: 10) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            type
          }
        }
      }
    }
  }
`;

// Query to fetch project images from metaobjects
export const GET_PROJECT_METAOBJECTS = gql`
  query GetProjectMetaobjects {
    metaobjects(type: "portfolio_project", first: 20) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            type
            reference {
              ... on MediaImage {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;

// Query for Toden Industries specific product features
export const GET_TODEN_FEATURES = gql`
  query GetTodenFeatures {
    metaobjects(type: "product_features", first: 10) {
      edges {
        node {
          id
          handle
          fields {
            key
            value
            type
            reference {
              ... on MediaImage {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;
