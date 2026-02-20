export const PPC_INFO_QUERY = `#graphql
  query PPCInfo {
    metaobjects(type: "ppcinfo", first: 1) {
      nodes {
        id
        description: field(key: "description") {
          value
        }
        link: field(key: "link") {
          value
        }
        color: field(key: "color") {
          value
        }
      }
    }
  }
`;

export const PPC_INFO_QUERY_BY_HANDLE = `#graphql
  query PPCInfoByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "ppcinfo" }) {
      id
      handle
      description: field(key: "description") {
        value
      }
      link: field(key: "link") {
        value
      }
      color: field(key: "color") {
        value
      }
    }
  }
` as const;