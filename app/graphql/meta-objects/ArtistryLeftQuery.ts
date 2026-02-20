
export const ARTISTRY_LEFT_QUERY = `#graphql
  query ArtistryLeft {
    metaobjects(type: "artistryleft", first: 1) {
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

export const ARTISTRY_LEFT_QUERY_BY_HANDLE = `#graphql
  query ArtistryLeftByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "artistryleft" }) {
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