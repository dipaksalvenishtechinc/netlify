export const ELEGANCE_SECTION_QUERY = `#graphql
  query GetEleganceSection {
    metaobjects(type: "elegance_section", first: 1) {
      edges {
        node {
          fields {
            key
            value
          }
        }
      }
    }
  }
`;

