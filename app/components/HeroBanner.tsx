import { Link } from '@remix-run/react';
import type {GetHeroBannerByHandleQuery} from 'storefrontapi.generated';

type HeroBannerMetaobject = GetHeroBannerByHandleQuery['metaobject'];

interface LinkData {
  text?: string;
  url?: string;
}

export function HeroBanner({
  heroBanner,
}: {
  heroBanner: HeroBannerMetaobject;
}) {
  if (!heroBanner) {
    return (
      <div className="flex items-center justify-center h-[200px] md:h-[250px] lg:h-[300px] bg-gray-100 text-gray-500 rounded-md">
        No Hero Banner data available.
      </div>
    );
  }

  const extractLinkData = (linkJson: string): LinkData => {
    try {
      const parsed = JSON.parse(linkJson) as LinkData;
      return {
        text: parsed.text || 'Shop Now',
        url: parsed.url || '#',
      };
    } catch (error) {
      console.error('Error parsing link:', error);
      return {text: 'Shop Now', url: '#'};
    }
  };

  const title = heroBanner.herobannertitle?.value?.trim() || '';
  const image = heroBanner.herobannerimage?.reference?.image ?? null;
  const linkData = heroBanner.herobannerlink?.value
    ? extractLinkData(heroBanner.herobannerlink.value)
    : {text: 'Learn More', url: '#'};

  return (
    <div className="hero-banner-container w-full">
      <div className="hero-banner relative w-full h-[200px] md:h-[250px] lg:h-[550px] overflow-hidden">
        {image?.url && (
          <img
            src={image.url}
            alt={image.altText || title || 'Hero Banner Image'}
            width={1200}
            height={300}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/1200x300/cccccc/333333?text=Image+Load+Error`;
              e.currentTarget.alt = 'Image failed to load, displaying placeholder';
            }}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-8 lg:p-10 container mx-auto">
          <p className="text-left text-[24px] md:text-[28px] lg:text-[32px] leading-tight text-white max-w-xs font-serif uppercase tracking-wide">
            {title}
          </p>
          {linkData.url && (
            <Link
              to={linkData.url ?? '#'}
              className="mt-2 text-white text-sm font-serif uppercase tracking-wide underline hover:text-gray-200 transition-colors duration-300"
            >
              {linkData.text || 'Learn More'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}