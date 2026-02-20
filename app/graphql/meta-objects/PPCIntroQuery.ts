export const PPC_INTRO_QUERY = `#graphql
  query PPCIntro {
    metaobjects(type: "ppcintro", first: 1) {
      nodes {
        id
        description: field(key: "description") {
          value
        }
        image: field(key: "image") {
          reference {
            ... on MediaImage {
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

export const PPC_INTRO_QUERY_BY_HANDLE = `#graphql
  query PPCIntroByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "ppcintro" }) {
      id
      handle
      description: field(key: "description") {
        value
      }
      image: field(key: "image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
              width
              height
            }
          }
        }
      }
    }
  }
` as const;