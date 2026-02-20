import React from 'react';
import type {ArtistryLeftByHandleQuery} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';
import {extractRichText, extractLinkData} from '~/lib/JsonParse';

type ArtistryLeftObject = ArtistryLeftByHandleQuery['metaobject'];

export function ArtistryLeft({
  artistryleft,
}: {
  artistryleft: ArtistryLeftObject;
}) {
  if (!artistryleft) {
    return (
      <div className="flex items-center justify-center h-[200px] md:h-[250px] lg:h-[300px] bg-gray-100 text-gray-500 rounded-md">
        No artistry left data available.
      </div>
    );
  }
  const title = artistryleft.title?.value || '';
  const content = extractRichText(artistryleft.content?.value || '');
  const linkData = extractLinkData(artistryleft.link?.value || '');
  const image = artistryleft.media?.reference?.image;

  return (
    <section className="w-full">
      <div className="relative flex flex-col lg:flex-row px-[15px] max-w-[1296px] mx-auto">
        <div className="w-full lg:w-1/2 relative min-h-[400px] z-[1] order-1 lg:order-none">
          {image?.url && (
            <Image
              data={image}
              className="absolute top-0 left-0 w-full h-full object-cover"
              width={500}
              height={500}
            />
          )}
        </div>

        <div className="w-full lg:w-1/2 order-2">
          <div
            className="
              bg-[#faf8f2] text-center 
              flex flex-col items-center justify-center 
              relative z-[10]
              text-[20px] min-h-[509px]
              px-[30px] py-[30px] 
              md:px-[40px] md:py-[40px] 
              my-[44px]
              lg:-ml-[60px] lg:mr-[60px]
              shadow-md">
            {artistryleft.title?.value && (
              <h2 className="font-classico text-[40px] mb-[22px] leading-[1.5]">
                {artistryleft.title.value}
              </h2>
            )}
            {artistryleft.content?.value && (
              <p className="mb-4">{artistryleft.content.value}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
