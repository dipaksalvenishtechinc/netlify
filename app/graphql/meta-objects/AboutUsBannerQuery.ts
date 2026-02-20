export const ABOUT_US_BANNER_QUERY = `#graphql
  query GetAboutUsBanner {
    metaobjects(type: "aboutusbanner", first: 1) {
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

export const ABOUT_US_BANNER_QUERY_BY_HANDLE = `#graphql
  query GetAboutUsBannerByHandle($handle: String!) { # Changed query name and added handle variable
    metaobject(handle: { handle: $handle, type: "aboutusbanner" }) { # Using metaobject with handle and type
      id
      handle
      # Directly select each field by its key using an alias
      title: field(key: "title") { # Assuming your metaobject field key is 'title'
        value
      }
      image: field(key: "image") { # Assuming your metaobject field key is 'image'
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
` as const;
