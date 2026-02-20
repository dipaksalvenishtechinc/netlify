export const PPC_INFOS_QUERY = `#graphql
  query PPCInfos {
    metaobjects(type: "ppcinfos", first: 1) {
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

export const PPC_INFOS_QUERY_BY_HANDLE = `#graphql
  query PPCInfosByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "ppcinfos" }) {
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
