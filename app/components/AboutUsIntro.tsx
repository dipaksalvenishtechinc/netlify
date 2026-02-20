import { Link } from '@remix-run/react';
import type {GetAboutUsIntroByHandleQuery} from 'storefrontapi.generated';

type AboutUsIntroMetaobject = GetAboutUsIntroByHandleQuery['metaobject'];

interface LinkData {
  text?: string;
  url?: string;
}

export function AboutUsIntro({
  aboutUsIntro,
}: {
  aboutUsIntro: AboutUsIntroMetaobject;
}) {
  if (!aboutUsIntro) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-100 text-gray-500">
        No About Us data available.
      </div>
    );
  }

  const extractLinkData = (linkJson: string): LinkData => {
    try {
      const parsed = JSON.parse(linkJson) as LinkData;
      return {
        text: parsed.text || 'Shop fine jewelry',
        url: parsed.url || '#',
      };
    } catch (error) {
      console.error('Error parsing link:', error);
      return {text: 'Shop fine jewelry', url: '#'};
    }
  };

  const title = aboutUsIntro.title?.value?.trim() || '';
  const image = aboutUsIntro.image?.reference?.image ?? null;
  const linkData = aboutUsIntro.link?.value
    ? extractLinkData(aboutUsIntro.link.value)
    : {text: 'Shop fine jewelry', url: '#'};

  return (
    <section className="relative w-full bg-center bg-no-repeat bg-cover text-right flex items-center justify-end min-h-[400px] lg:min-h-[600px] py-[40px] pb-[43px] lg:py-[53px] lg:pb-[60px] text-[18px] lg:text-[19px] leading-[1.277] lg:leading-[1.526] tracking-[0.3px]">
      {image?.url && (
        <img
          src={image.url}
          alt={image.altText || title || 'About Us Image'}
          width={1200}
          height={500}
          className="absolute inset-0 w-full h-full object-cover z-0"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/1200x500/cccccc/333333?text=Image+Load+Error`;
            e.currentTarget.alt = 'Image failed to load, displaying placeholder';
          }}
        />
      )}
      <div className="relative z-10 w-full max-w-[1042px] mx-auto px-4">
        <div className="ml-auto w-full md:w-1/2 pt-[33px] md:pt-[0]">
          <p className="!text-[#87857E] !font-serif !tracking-[-0.5px] !mb-[14px] !text-[30px] !md:text-[30px] !leading-[1.15] font-normal text-justify">
            {title}
          </p>
          {linkData.url && (
            <Link
              to={linkData.url ?? '#'}
              className="inline-block uppercase font-normal text-[13px] lg:text-[17px] tracking-[4.25px] text-[#2b2a2a] border-b border-transparent pb-[5px] transition-all duration-300 hover:border-black">
              {linkData.text || 'Shop fine jewelry'}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}