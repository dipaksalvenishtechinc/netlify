import { Link } from '@remix-run/react';
import type {GetAboutUsInfoByHandleQuery} from 'storefrontapi.generated';

type AboutUsInfoMetaobject = GetAboutUsInfoByHandleQuery['metaobject'];

export function AboutUsInfoSection({
  aboutData,
}: {
  aboutData: AboutUsInfoMetaobject;
}) {
  if (!aboutData) {
    return (
      <div className="py-10 text-center text-gray-400">
        No About Us Info data available.
      </div>
    );
  }

  const title = aboutData.title?.value?.trim() || '';
  const description = aboutData.description?.value?.trim() || '';

  return (
    <section className="relative w-full text-center py-[87px] pb-[139px] bg-white overflow-hidden">
      <div className="absolute inset-0 bg-white z-0" />
      <div className="max-w-[870px] mx-auto px-4 relative z-10">
        <div className="relative py-[50px] pb-[80px] text-[70px] leading-[26px] tracking-[0.32px] font-large">
          {title && (
            <h2 className="!text-[40px] md:text-[56px] !font-light leading-[1.4] mb-4 text-[#87857E] font-serif">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[#333] !text-[20px] text-base font-medium font-serif md:text-lg text-justify ">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}