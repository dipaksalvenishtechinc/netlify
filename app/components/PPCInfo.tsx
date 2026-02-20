import React from 'react';
import type { PpcInfoByHandleQuery } from 'storefrontapi.generated';
import { extractLinkData } from '~/lib/JsonParse';

type PPCInfoObject = PpcInfoByHandleQuery['metaobject'];

export function PPCInfo({ ppcinfo }: { ppcinfo: PPCInfoObject }) {
   if (!ppcinfo) {
    return (
      <div className="flex items-center justify-center h-[200px] md:h-[250px] lg:h-[300px] bg-gray-100 text-gray-500 rounded-md">
        No ppc Info data available.
      </div>
    );
  }
  const description = ppcinfo.description?.value || '';
  const linkData = extractLinkData(ppcinfo.link?.value || '');
  const backgroundColor = ppcinfo.color?.value || '#ffffff';

  return (
    <div className="text-center py-20 px-[15px]" style={{ backgroundColor }}>
      <div className="max-w-[920px] mx-auto">
        {ppcinfo.description?.value && (
          <p className="!text-[40px] !mb-0 text-justify">
            {ppcinfo.description.value}
          </p>
        )}

        {linkData.url && linkData.text && (
          <div className="cta w-full mt-6">
            <a
              href={linkData.url}
              className="btn--primary btn--cta inline-block align-middle text-[#2b2a2a] border border-[#2b2a2a] text-[15px] font-medium px-[22px] py-[11px] text-center transition-all duration-200 ease-out uppercase tracking-wide bg-transparent hover:bg-[#e5eba5] hover:text-[#2b2a2a]"
            >
              <div className="btn__content">{linkData.text}</div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
