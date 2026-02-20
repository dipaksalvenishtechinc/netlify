// graphql/meta-objects/AboutUsInfoQuery.ts
export const ABOUT_US_INFO_QUERY = `#graphql
  query GetAboutUsInfo {
    metaobjects(type: "aboutusinfo", first: 1) {
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

export const PPC_TEXT_QUERY = `#graphql
  query PPCText {
  metaobjects(type: "aboutusinfo", first: 2) {
    nodes {
      id
      description: field(key: "description") {
        value
      }
    }
  }
}
`;

export const ABOUT_US_INFO_QUERY_BY_HANDLE = `#graphql
  query GetAboutUsInfoByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "aboutusinfo" }) {
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

export const PPC_TEXT_QUERY_BY_HANDLE = `#graphql
  query PPCTextByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "aboutusinfo" }) {
      id
      handle
      description: field(key: "description") {
        value
      }
    }
  }
` as const;