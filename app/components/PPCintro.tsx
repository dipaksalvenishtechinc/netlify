import React from 'react';
import type { PpcIntroByHandleQuery } from 'storefrontapi.generated';

type PPCIntroObject = PpcIntroByHandleQuery['metaobject'];

export function PPCIntro({ ppcintro }: { ppcintro: PPCIntroObject }) {
   if (!ppcintro) {
    return (
      <div className="flex items-center justify-center h-[200px] md:h-[250px] lg:h-[300px] bg-gray-100 text-gray-500 rounded-md">
        No PPC Into data available.
      </div>
    );
  }
  const description = ppcintro.description?.value || '';
  const image = ppcintro.image?.reference?.image;

  return (
    <section className="relative w-full bg-center bg-no-repeat bg-cover flex items-center justify-center h-[200px] md:h-[400px] py-[30px]">
      {image?.url && (
        <img
          src={image.url}
          alt={image.altText || 'PPC Intro Image'}
          className="absolute inset-0 w-full h-[250px] object-cover z-0"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              'https://placehold.co/1200x500/cccccc/333333?text=Image+Load+Error';
          }}
        />
      )}

      <div className="relative max-w-[55%] mx-auto text-center">
        {description && (
          <h2 className="!text-white !font-serif !tracking-[-0.5px] !mb-40 !text-[30px] !md:text-[26px] !leading-tight !font-normal">
            {description}
          </h2>
        )}
      </div>
    </section>
  );
}
