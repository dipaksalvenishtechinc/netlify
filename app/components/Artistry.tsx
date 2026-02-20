import { Link } from 'react-router';
import {Image} from '@shopify/hydrogen';
import type { ArtistryContentByHandleQuery } from 'storefrontapi.generated';
import { extractRichText,extractLinkData } from '~/lib/JsonParse';
type artistryObject = ArtistryContentByHandleQuery['metaobject'];

export function Artistry({
  artistryContent,
}: {
  artistryContent: artistryObject;
}) {
       if (!artistryContent) {
    // You can return null, a skeleton loader, or an error message here.
    // Returning null means the component won't render anything.
    return null;
  }
      const buttonLink = "/shop";
const linkData=extractLinkData(artistryContent.link?.value || '')
const descriptions = extractRichText(artistryContent.content?.value || '');
    return(
           <section className="w-full">
          <div className="relative flex flex-col lg:flex-row px-4 max-w-7xl mx-auto">
            <div className="w-full lg:w-1/2">
              <div
                className="
                  bg-[#faf8f2] text-center 
                  flex flex-col items-center justify-center 
                  relative z-10
                  text-xl min-h-[509px]
                  px-8 py-8 
                  md:px-10 md:py-10 
                  my-11
                  lg:-mr-[60px] lg:ml-[60px]
                  shadow-md"
              >
                <h2 className="font-serif text-4xl mb-6 leading-tight">
                  {artistryContent.title?.value||'Artistry in Motion'}
                </h2>
                 {descriptions.map((desc, index) => (
              <p key={index} className="mb-4">{desc}</p>
            ))}
            
                <a
                  href={linkData.url}
                  className="
                    text-[#2b2a2a]
                    uppercase
                    text-base
                    tracking-[4.25px]
                    pb-1
                    border-b border-transparent
                    font-normal
                    transition-all
                    duration-350
                    ease-[cubic-bezier(0.3,0.86,0.36,0.95)]
                    hover:border-black"
                >
                 {linkData.text}
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative min-h-[400px] z-0">
             <Image className="absolute top-0 right-0 w-full h-full object-cover" />
              <img
                src={artistryContent.media?.reference?.image?.url}
                alt={artistryContent.media?.reference?.image?.altText||"alt"}
                className="absolute top-0 right-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </section>
    );
}