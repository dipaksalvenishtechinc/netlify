import { Link } from 'react-router';
import type { GetLuxuryshineContentByHandleQuery } from 'storefrontapi.generated';

type LuxuryshineMetaobject = GetLuxuryshineContentByHandleQuery['metaobject'];

interface RichText {
  children?: {
    children?: Array<{ value?: string }>;
  }[];
}

interface LinkData {
  text?: string;
  url?: string;
}

export function LuxuryShine({
  luxuryshinecollection,
}: {
  luxuryshinecollection: LuxuryshineMetaobject;
}) {
  if (!luxuryshinecollection) {
    // You can return null, a skeleton loader, or an error message here.
    // Returning null means the component won't render anything.
    return null;
  }
  const extractTextFromRichText = (richTextJson: string): string => {
    try {
      const parsed = JSON.parse(richTextJson) as RichText;
      if (parsed.children && parsed.children[0]?.children) {
        return parsed.children[0].children.map((child) => child.value || '').join('');
      }
      return '';
    } catch (error) {
      console.error('Error parsing rich text:', error);
      return '';
    }
  };

  const extractLinkData = (linkJson: string): LinkData => {
    try {
      const parsed = JSON.parse(linkJson) as LinkData;
      return {
        text: parsed.text || 'Shop Now',
        url: parsed.url || '#',
      };
    } catch (error) {
      console.error('Error parsing link:', error);
      return { text: 'Shop Now', url: '#' };
    }
  };

  const contentText = luxuryshinecollection.luxuryshineContent?.value
    ? extractTextFromRichText(luxuryshinecollection.luxuryshineContent.value)
    : 'Discover our exclusive collection of luxury products designed to elevate your style.';

  const linkData = luxuryshinecollection.luxuryshineDiscoverLink?.value
    ? extractLinkData(luxuryshinecollection.luxuryshineDiscoverLink.value)
    : { text: 'Shop Now', url: '#' };

  const collectionText1 = luxuryshinecollection.luxuryshineCollectionText1?.value || '';
  const collectionImage1 = luxuryshinecollection.luxuryshineCollectionImage1?.reference?.image;
  const collectionLink1 = luxuryshinecollection.luxuryshineCollectionLink1?.value
    ? extractLinkData(luxuryshinecollection.luxuryshineCollectionLink1.value)
    : { text: '', url: '#' };

  const collectionText2 = luxuryshinecollection.luxuryshineCollectionText2?.value || '';
  const collectionImage2 = luxuryshinecollection.luxuryshineCollectionImage2?.reference?.image;
  const collectionLink2 = luxuryshinecollection.luxuryshineCollectionLink2?.value
    ? extractLinkData(luxuryshinecollection.luxuryshineCollectionLink2.value)
    : { text: '', url: '#' };

  return (
    <div className="w-full h-[1300px] bg-white" id="luxury-shine-section">
      <div className="relative">
        <div className="md:h-[652px] flex flex-col items-center text-center bg-[#D3C9C2]">
          <div className="flex flex-col items-center justify-center text-center h-auto mb-25 px-5 lg:w-[855px]">
            <div
              className="text-[40px] leading-[47px] tracking-[0px] text-[#2B2A2A] opacity-100 p-10 mt-4 mx-auto"
              style={{ fontFamily: 'ui-serif' }}
            >
              {luxuryshinecollection.luxuryshineTitle?.value || 'Welcome to Luxury Shine'}
            </div>
            <div className="text-[20px] leading-[26px] tracking-[0.32px] text-[#2B2A2A] opacity-100 font-normal mb-4">
              {contentText}
            </div>
              <Link to
              ={linkData.url??"#"}
              className="text-[17px] leading-[20px] font-normal tracking-[4.25px] text-[#2B2A2A] uppercase mt-4 whitespace-nowrap mx-auto mb-5 hover:underline"
            >
              {linkData.text}
            </Link>
          </div>

          <div className="gap-4 flex flex-col md:flex-row items-center justify-center">
            {collectionImage1?.url && (
              <Link to={collectionLink1.url??"#"} className="block group">
                <img
                  src={collectionImage1.url}
                  alt={collectionImage1.altText || 'Luxury Shine Image 1'}
                  width={561}
                  height={400}
                  className="w-10/12 lg:w-[561px] md:w-5/12 h-auto object-cover transition-transform group-hover:scale-105"
                  loading="eager"
                />
                {collectionText1 && (
                  <div className="mt-2 text-[#2B2A2A] text-center text-lg">{collectionText1}</div>
                )}
              </Link>
            )}

            {collectionImage2?.url && (
             <Link to={collectionLink2.url??"#"}className="block group">
                <img
                  src={collectionImage2.url}
                  alt={collectionImage2.altText || 'Luxury Shine Image 2'}
                  width={561}
                  height={400}
                  className="w-10/12 lg:w-[561px] md:w-5/12 h-auto object-cover transition-transform group-hover:scale-105"
                  loading="eager"
                />
                {collectionText2 && (
                  <div className="mt-2 text-[#2B2A2A] text-center text-lg">{collectionText2}</div>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
