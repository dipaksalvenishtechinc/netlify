export const ARTISTRY_RIGHT_QUERY = `#graphql
  query ArtistryRight {
    metaobjects(type: "artistryright", first: 1) {
      nodes {
        id
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
`;

export const ARTISTRY_RIGHT_QUERY_BY_HANDLE = `#graphql
  query ArtistryRightByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "artistryright" }) {
      id
      handle
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