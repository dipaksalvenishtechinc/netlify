// ~/graphql/meta-objects/AboutSectionQuery.ts
export const ABOUT_SECTION_QUERY = `#graphql
  query GetAboutSection {
    metaobjects(type: "about_section", first: 1) { # <--- ENSURE THIS MATCHES YOUR SHOPIFY API HANDLE EXACTLY
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

export const ABOUT_SECTION_QUERY_BY_HANDLE = `#graphql
  query GetAboutSectionByHandle($handle: String!) { # Changed query name and added handle variable
    metaobject(handle: { handle: $handle, type: "about_section" }) { # Using metaobject with handle and type
      id
      handle
      # Directly select each field by its key using an alias
      aboutsectiontitle: field(key: "aboutsectiontitle") { # Alias for the title field
        value
      }
      aboutsectionimage1: field(key: "aboutsectionimage1") { # Alias for image1 field
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      aboutsectionimage2: field(key: "aboutsectionimage2") { # Alias for image2 field
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      aboutsectionlink: field(key: "aboutsectionlink") { # Alias for the link field
        value
      }
      aboutsectiondescriptionbox: field(key: "aboutsectiondescriptionbox") { # Alias for the description box field
        value
      }
    }
  }
` as const;