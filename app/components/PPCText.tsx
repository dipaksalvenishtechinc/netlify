import React from 'react';
import {data} from 'react-router-dom';
import type {PpcTextByHandleQuery} from 'storefrontapi.generated';
import {extractRichText} from '~/lib/JsonParse';

type PPCTextObject = PpcTextByHandleQuery['metaobject'];

export function PPCText({ppctext}: {ppctext: PPCTextObject}) {
 if (!ppctext) {
    return (
      <div className="flex items-center justify-center h-[200px] md:h-[250px] lg:h-[300px] bg-gray-100 text-gray-500 rounded-md">
        No ppctext data available.
      </div>
    );
  }
  const description = extractRichText(ppctext.description?.value || '');

 return (
  <div className="text-center py-[60px] px-[15px] bg-white">
    <div className="max-w-[920px] mx-auto">
      {ppctext.description?.value && (
      <h2 className="!font-serif !text-[30px] !font-medium !leading-[1.5] !text-[#87857e] !tracking-[0] !mb-0">
        {ppctext.description.value}</h2>
      )}
    </div>
  </div>
);
}
