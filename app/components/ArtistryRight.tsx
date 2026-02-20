import React from 'react';
import type {ArtistryRightByHandleQuery} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';
import {extractRichText, extractLinkData} from '~/lib/JsonParse';

type ArtistryRightObject = ArtistryRightByHandleQuery['metaobject'];

export function ArtistryRight({
  artistryright,
}: {
  artistryright: ArtistryRightObject;
}) {
   if (!artistryright) {
    return (
      <div className="flex items-center justify-center h-[200px] md:h-[250px] lg:h-[300px] bg-gray-100 text-gray-500 rounded-md">
        No artistry right data available.
      </div>
    );
  }
  const title = artistryright.title?.value || '';
  const description = extractRichText(artistryright.content?.value || '');
  const linkData = extractLinkData(artistryright.link?.value || '');
  const image = artistryright.media?.reference?.image;

  return (
    <section className="w-full">
      <div className="relative flex flex-col lg:flex-row px-[15px] max-w-[1296px] mx-auto">
        <div className="w-full lg:w-1/2">
          <div
            className="
              bg-[#faf8f2] text-center 
              flex flex-col items-center justify-center 
              relative z-[10]
              text-[20px] min-h-[509px]
              px-[30px] py-[30px] 
              md:px-[40px] md:py-[40px] 
              my-[44px]
              lg:-mr-[60px] lg:ml-[60px]
              shadow-md"
          >
            {artistryright.title?.value && (
              <h2 className="font-classico text-[40px] mb-[22px] leading-[1.5]">
                {artistryright.title.value}
              </h2>
            )}

            {artistryright.content?.value && (
              <p className="mb-4">{artistryright.content.value}</p>
            )}

            {linkData.url && linkData.text && (
              <a
                href={linkData.url}
                className="
                  text-[#2b2a2a]
                  uppercase
                  text-[17px]
                  tracking-[4.25px]
                  pb-[5px]
                  border-b border-transparent
                  font-normal
                  transition-all
                  duration-[350ms]
                  ease-[cubic-bezier(0.3,0.86,0.36,0.95)]
                  hover:border-black"
              >
                {linkData.text}
              </a>
            )}
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative min-h-[400px] z-[1]">
          {image?.url && (
            <Image
              data={image}
              className="absolute top-0 right-0 w-full h-full object-cover"
              width={500}
              height={500}
            />
          )}
        </div>
      </div>
    </section>
  );
}
