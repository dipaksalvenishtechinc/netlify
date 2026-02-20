export const HERO_BANNER_QUERY = `#graphql
  query GetHeroBanner {
    metaobjects(type: "herobanner", first: 1) {
      edges {
        node {
          fields {
            key
            value
            reference {
              ... on MediaImage {
                image {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const HERO_BANNER_QUERY_BY_HANDLE = `#graphql
  query GetHeroBannerByHandle($handle: String!) { # Define the handle variable
    metaobject(handle: { handle: $handle, type: "herobanner" }) { # Use the metaobject field with the handle
      id
      handle
      herobannertitle: field(key: "herobannertitle") {
        value
      }
      herobannerimage: field(key: "herobannerimage") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      herobannerlink: field(key: "herobannerlink") {
        value
      }
    }
  }
` as const;