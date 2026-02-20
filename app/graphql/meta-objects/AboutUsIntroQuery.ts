export const ABOUT_US_INTRO_QUERY = `#graphql
  query GetAboutUsIntro {
    metaobjects(type: "aboutusintro", first: 2) {
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

export const ABOUT_US_INTRO_QUERY_BY_HANDLE = `#graphql
  query GetAboutUsIntroByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "aboutusintro" }) {
      id
      handle
      title: field(key: "title") {
        value
      }
      image: field(key: "image") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      link: field(key: "link") {
        value
      }
    }
  }
` as const;
