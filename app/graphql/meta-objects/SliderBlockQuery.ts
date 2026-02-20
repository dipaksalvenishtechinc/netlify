// graphql/meta-objects/SliderBlock.ts
export const SLIDER_BLOCK_QUERY = `#graphql
  query SliderBlock {
    metaobjects(type: "sliderblock", first: 1) {
      nodes {
        id
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
        description: field(key: "description") {
          value
        }
        subdescription: field(key: "subdescription") {
          value
        }
      }
    }
  }
`;

export const SLIDER_BLOCK_QUERY_BY_HANDLE = `#graphql
  query SliderBlockByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "sliderblock" }) {
      id
      handle
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
      description: field(key: "description") {
        value
      }
      subdescription: field(key: "subdescription") {
        value
      }
    }
  }
` as const;

