import { Link } from 'react-router';
import type {GetEleganceSectionByHandleQuery} from 'storefrontapi.generated';

type EleganceSectionMetaobject = GetEleganceSectionByHandleQuery['metaobject'];

export function EleganceSection({
  eleganceData,
}: {
  eleganceData: EleganceSectionMetaobject;
}) {
  if (!eleganceData) {
    return (
      <div className="py-10 text-center text-gray-400">
        No Elegance Section data available.
      </div>
    );
  }

  const title = eleganceData.title?.value?.trim() || '';
  const description = eleganceData.description?.value?.trim() || '';

  return (
    <section className="relative bg-white w-full text-center py-[87px] pb-[139px]">
      <div className="max-w-[1025px] mx-auto px-4 relative z-10">
        <div className="relative py-[50px] pb-[80px] text-[20px] leading-[26px] tracking-[0.32px] font-medium">
          {title && (
            <h2 className="!text-[40px] !font-normal !leading-[1.4] !mb-4 text-[#87857E] font-serif">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-[#303] text-justify ">
              {description}
            </p>
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-[#d3c9c2] opacity-50 z-0" />
    </section>
  );
}