export const LUXURY_SHINE_QUERY_BY_HANDLE = `#graphql
  query GetLuxuryshineContentByHandle($handle: String!) {
    metaobject(handle: { handle: $handle, type: "luxuryshine" }) {
      id
      handle
      # Directly select each field by its key using an alias
      luxuryshineTitle: field(key: "luxuryshinetitle") {
        value
      }
      luxuryshineContent: field(key: "luxuryshinecontent") {
        value
      }
      luxuryshineProducts: field(key: "luxuryshineproducts") {
        value
      }
      luxuryshineDiscoverLink: field(key: "luxuryshinediscoverlink") {
        value
      }
      luxuryshineCollectionText1: field(key: "luxuryshinecollectiontext1") {
        value
      }
      luxuryshineCollectionImage1: field(key: "luxuryshinecollectionimage1") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      luxuryshineCollectionLink1: field(key: "luxuryshinecollectionlink1") {
        value
      }
      luxuryshineCollectionText2: field(key: "luxuryshinecollectiontext2") {
        value
      }
      luxuryshineCollectionImage2: field(key: "luxuryshinecollectionimage2") {
        reference {
          ... on MediaImage {
            image {
              url
              altText
            }
          }
        }
      }
      luxuryshineCollectionLink2: field(key: "luxuryshinecollectiontlink2") {
        value
      }
    }
  }
` as const;
