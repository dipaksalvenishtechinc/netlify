export const ARTISTRY_QUERY = `#graphql
  query ArtistryContent {
    metaobjects(type: "artistry", first: 1) {
      nodes { # Using 'nodes' is often preferred over 'edges { node { ... } }' for cleaner access
        id
        handle
        # Directly select each field by its key using an alias
        title: field(key: "title") {
          value
        }
        content: field(key: "content") {
          value
        }
        link: field(key: "link") {
          value
        }
        media: field(key: "media") {
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
` as const;

export const ARTISTRY_QUERY_BY_HANDLE = `#graphql
  query ArtistryContentByHandle($handle: String!) { # Define a handle variable
    metaobject(handle: { handle: $handle, type: "artistry" }) { # Query a single metaobject by handle and type
      id
      handle
      # Directly select each field by its key using an alias
      title: field(key: "title") {
        value
      }
      content: field(key: "content") {
        value
      }
      link: field(key: "link") {
        value
      }
      media: field(key: "media") {
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