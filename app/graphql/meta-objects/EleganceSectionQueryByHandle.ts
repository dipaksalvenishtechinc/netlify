export const ELEGANCE_SECTION_QUERY_BY_HANDLE = `#graphql
  query GetEleganceSectionByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "elegance_section" }) {
      id
      handle
      title: field(key: "title") {
        value
      }
      description: field(key: "description") {
        value
      }
    }
  }
` as const;