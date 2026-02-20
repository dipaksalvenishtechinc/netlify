import { Link} from 'react-router';

import {Image} from '@shopify/hydrogen';
import type {FeaturedCollectionFragment} from 'storefrontapi.generated';

interface FeaturedCollectionsProps {
  collections: FeaturedCollectionFragment[];
}

export function FeaturedCollections({collections}: FeaturedCollectionsProps) {
  if (!collections || collections.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 p-4 justify-self-center ">
      {collections.map((collection) => {
        const image = collection?.image;
        return (
          <Link
            key={collection.id}
            className="h-[848px] lg:w-[560px] w-full relative flex flex-col items-center  hover:shadow-2xl hover:scale-105 transition-transform duration-100"
            to={`/collections/${collection.handle}`}
          >
            {/* Title at top center */}
            <div className="p-4 flex flex-col items-center  text-center">
              <h2 className=" !text-4xl !font-normal !mb-0 text-gray-800  line-clamp-2">
                {collection.title}
              </h2>
            </div>

            {/* Image below the title */}
            {image && (
              <div className="flex-1 w-full  px-4">
                <Image
                  data={image}
                  sizes="100vw"
                  className="w-full h-full object-cover rounded-md  "
                />
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
}

// Also, move the FEATURED_COLLECTION_QUERY here if it's primarily used by this component
export const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;