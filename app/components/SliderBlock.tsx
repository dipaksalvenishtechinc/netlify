import React from 'react';
import type { SliderBlockByHandleQuery } from 'storefrontapi.generated';
import { Image } from '@shopify/hydrogen';
import { extractRichText } from '~/lib/JsonParse';

type SliderBlockObject = SliderBlockByHandleQuery['metaobject'] | null;

export function SliderBlock({ block }: { block: SliderBlockObject }) {
  if (!block) {
    return (
      <div className="flex items-center justify-center h-[320px] bg-gray-100 text-gray-500">
        No Slider Block data available.
      </div>
    );
  }

  const description = (block.description?.value || '');
  const subdescription = (block.subdescription?.value || '');
  const image = block.image?.reference?.image;

  return (
    <div className="w-full">
      <div className="relative w-full min-h-[320px] flex items-center justify-center overflow-hidden">
        {image?.url && (
          <Image
            data={image}
            className="absolute inset-0 w-full h-full object-cover"
            sizes="100vw"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/1200x320/cccccc/333333?text=Image+Load+Error`;
              e.currentTarget.alt = 'Image failed to load, displaying placeholder';
            }}
          />
        )}
        <div className="absolute bg-black/30 z-10" />
        <div className="relative z-20 px-4 md:px-8 max-w-[1060px] w-full text-white text-center">
          {description && (
            <h1 className="!text-[30px] !md:text-[40px] !lg:text-[48px] !font-classico mb-4">
              {description}
            </h1>
          )}
          {subdescription && (
            <p className="text-base md:text-lg">{subdescription}</p>
          )}
        </div>
      </div>
    </div>
  );
}