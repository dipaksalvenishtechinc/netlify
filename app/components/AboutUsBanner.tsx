import { Link } from '@remix-run/react';
import type {GetAboutUsBannerByHandleQuery} from 'storefrontapi.generated';

type AboutUsBannerMetaobject = GetAboutUsBannerByHandleQuery['metaobject'];

export function AboutUsBanner({
  aboutBannerData,
}: {
  aboutBannerData: AboutUsBannerMetaobject;
}) {
  if (!aboutBannerData) {
    return (
      <div className="flex items-center justify-center h-[300px] md:h-[400px] lg:h-[500px] bg-gray-100 text-gray-500 rounded-md">
        No About Us Banner data available.
      </div>
    );
  }

  const title = aboutBannerData.title?.value?.trim() || '';
  const image = aboutBannerData.image?.reference?.image ?? null;

  return (
    <section className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {image?.url && (
        <img
          src={image.url}
          alt={image.altText || title || 'About Us Banner'}
          width={1200}
          height={500}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/1200x500/cccccc/333333?text=Image+Load+Error`;
            e.currentTarget.alt = 'Image failed to load, displaying placeholder';
          }}
        />
      )}
      <div className="absolute inset-0 flex flex-col items-start justify-center p-6 md:p-8 lg:p-10 container mx-auto">
        <h2 className="text-left !text-[45px] md:text-[56px] lg:text-[64px] leading-tight text-white max-w-lg !font-serif !font-normal tracking-wide">
          {title}
        </h2>
      </div>
    </section>
  );
}