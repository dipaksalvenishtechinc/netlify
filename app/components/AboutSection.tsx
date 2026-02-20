import { Link } from 'react-router';
import type {GetAboutSectionByHandleQuery} from 'storefrontapi.generated';
import { extractRichText } from '~/lib/JsonParse';

type AboutSectionMetaobject = GetAboutSectionByHandleQuery['metaobject'];

interface LinkData {
  text?: string;
  url?: string;
}

export function AboutSection({
  aboutSection,
}: {
  aboutSection: AboutSectionMetaobject;
}) {
  if (!aboutSection) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-100 text-gray-500 rounded-md">
        No About Section data available.
      </div>
    );
  }

  const extractLinkData = (linkJson: string): LinkData => {
    try {
      const parsed = JSON.parse(linkJson) as LinkData;
      return {
        text: parsed.text || 'Find Out More',
        url: parsed.url || '#',
      };
    } catch (error) {
      console.error('Error parsing link:', error);
      return {text: 'Find Out More', url: '#'};
    }
  };

 
 const title = aboutSection.aboutsectiontitle?.value?.trim() || '';
  const image1 = aboutSection.aboutsectionimage1?.reference?.image ?? null;
  const image2 = aboutSection.aboutsectionimage2?.reference?.image ?? null;
  const linkData = aboutSection.aboutsectionlink?.value
    ? extractLinkData(aboutSection.aboutsectionlink.value)
    : {text: 'Find Out More', url: '#'};
  const description = aboutSection.aboutsectiondescriptionbox?.value
    ? extractRichText(aboutSection.aboutsectiondescriptionbox.value)
    : '';

  return (
    <div className="max-w-[1280px] mx-auto px-10 flex flex-col md:flex-row justify-between gap-6 flex-wrap py-10">
      <div className="relative w-full md:w-[49%] pb-[80%]">
        {image1?.url && (
          <img
            src={image1.url}
            alt={image1.altText || 'About Section Image 1'}
            width={640}
            height={480}
            className="absolute top-0 right-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/600x400/cccccc/333333?text=Image+1+Load+Error`;
              e.currentTarget.alt = 'Image failed to load, displaying placeholder';
            }}
          />
        )}
      </div>
      <div className="w-full md:w-[44%] text-center md:pt-[175px] text-[#2B2A2A] text-[16px] md:text-[18px] font-normal">
        <div className="mx-auto">
          <div className="relative w-[156px] h-[225px] md:w-[313px] md:h-[451px] rounded-full overflow-hidden mb-6 mx-auto">
            {image2?.url && (
              <img
                src={image2.url}
                alt={image2.altText || 'About Section Image 2'}
                width={600}
                height={400}
                className="absolute top-0 right-0 w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = `https://placehold.co/600x400/cccccc/333333?text=Image+2+Load+Error`;
                  e.currentTarget.alt = 'Image failed to load, displaying placeholder';
                }}
              />
            )}
          </div>
          <div className="px-2">
            {title && (
              <h2 className="font-serif text-[26px] md:text-[30px] text-[#87857e] leading-none tracking-[0] word-spacing-[-9px] mb-[17px]">
                {title}
              </h2>
            )}
            {description && (
              <p className="!mb-6 font-serif">
                {description}
              </p>
            )}
            {linkData.url && (
              <Link
                to={linkData.url ?? '#'}
                className="inline-block text-[13px] md:text-[17px] tracking-[4.25px] !hover:no-underline uppercase font-medium text-[#2b2a2a] border-transparent pb-[5px] transition-all duration-300"
              >
                {linkData.text || 'Find Out More'}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}