import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Button } from "primereact/button";
import {Suspense} from 'react';
import {Await, NavLink} from '@remix-run/react';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}


export function NewFooter({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
   return (
      <Suspense>
        <Await resolve={footerPromise}>
          {(footer) => (
            <footer className="footer">
              {footer?.menu && header.shop.primaryDomain?.url && (
                <NewFooterMenu
                  menu={footer.menu}
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                />
              )}
            </footer>
          )}
        </Await>
      </Suspense>
    );
};

function NewFooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  const footerItems = (menu || FALLBACK_FOOTER_MENU).items.map((item) => {
    if (!item.url) return null;

    const url =
      item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain) ||
      item.url.includes(primaryDomainUrl)
        ? new URL(item.url).pathname
        : item.url;

    const isExternal = !url.startsWith('/');

    return {
      label: item.title,
      href: url,
      isExternal,
    };
  }).filter(Boolean);
 const copyrightItem = menu?.items?.[menu.items.length-1]; // last item in menu
  const copyrightText = copyrightItem?.title?.trim();
  console.log(menu);
  return (
    <footer className="bg-[#2B2A2A] py-5 font-[MrEavesXLModOT]">
      <div className="flex flex-wrap justify-between px-5 ml-10">
        <div className="flex flex-col mb-4 md:mb-0 w-full md:w-1/4 text-left text-[#FAF8F2] opacity-100">
          {footerItems.slice(0, 1).map((link, index) =>
            link.isExternal ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF8F2] hover:text-gray-400 mb-2 text-left text-[40px] leading-[47px] tracking-[0px] w-[232px] h-[87px] font-normal font-sans"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={index}
                to={link.href}
                className={({isActive, isPending}) =>
                  `text-[#FAF8F2] hover:text-gray-400 mb-2 text-left text-[40px] leading-[47px] tracking-[0px] w-[232px] h-[87px] font-normal font-sans ${
                    isActive ? 'font-bold' : ''
                  } ${isPending ? 'text-gray-500' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </div>

        <div className="flex flex-col mb-4 md:mb-0 w-full md:w-1/4">
          {footerItems.slice(1, 4).map((link, index) =>
            link.isExternal ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF8F2] hover:text-gray-400 mb-2 text-left text-lg leading-6 tracking-[2px] uppercase opacity-100"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={index}
                to={link.href}
                className={({isActive, isPending}) =>
                  `text-[#FAF8F2] hover:text-gray-400 mb-2 text-left text-lg leading-6 tracking-[2px] uppercase opacity-100 ${
                    isActive ? 'font-bold' : ''
                  } ${isPending ? 'text-gray-500' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </div>

        <div className="flex flex-col mb-4 md:mb-0 w-full md:w-1/4">
          {footerItems.slice(4, 7).map((link, index) =>
            link.isExternal ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF8F2] hover:text-gray-400 mb-2 text-left text-lg leading-6 tracking-[2px] uppercase opacity-100"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={index}
                to={link.href}
                className={({isActive, isPending}) =>
                  `text-[#FAF8F2] hover:text-gray-400 mb-2 text-left text-lg leading-6 tracking-[2px] uppercase opacity-100 ${
                    isActive ? 'font-bold' : ''
                  } ${isPending ? 'text-gray-500' : ''}`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </div>

        <div className="flex flex-col items-center md:items-start w-full md:w-1/4">
          <h3 className="text-[#FAF8F2] mb-2 uppercase">
            Sign Up for Promotions
          </h3>
          <div className="flex items-center mb-4 relative">
            <input
              type="email"
              className="text-[#FAF8F2] focus:outline-none py-2 px-4 w-72 border-b-2 border-[#FAF8F2] bg-transparent"
              placeholder="Email"
            />
            <Button
              label=">"
              className="ml-[-30px] p-button-text p-button-rounded text-[#FAF8F2] absolute right-0 bottom-0"
            />
          </div>

          <div className="flex justify-center space-x-6 mb-4">
            {footerItems.slice(7, 13).map((link, index) => {
              let Icon = null;
              switch (link.label.toLowerCase()) {
                case 'facebook':
                  Icon = FaFacebook;
                  break;
                case 'instagram':
                  Icon = FaInstagram;
                  break;
                case 'twitter':
                  Icon = FaTwitter;
                  break;
                case 'pinterest':
                  Icon = FaPinterest;
                  break;
                case 'linkedin':
                  Icon = FaLinkedin;
                  break;
                case 'youtube':
                  Icon = FaYoutube;
                  break;
                default:
                  return null; // skip unknown
              }

              return link.isExternal ? ( // Social links are almost always external
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-[#FAF8F2] hover:text-gray-400"
                >
                  <Icon size={24} />
                </a>
              ) : (
                <NavLink
                  key={index}
                  to={link.href}
                  aria-label={link.label}
                  className={({isActive, isPending}) =>
                    `text-[#FAF8F2] hover:text-gray-400 ${
                      isActive ? 'font-bold' : ''
                    } ${isPending ? 'text-gray-500' : ''}`
                  }
                >
                  <Icon size={24} />
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 px-5 text-sm text-[#87857E] text-right font-[MrEavesXLModOT] text-[14px] leading-[17px] tracking-[0.7px] uppercase opacity-100">
        <div>{copyrightText && <p>{copyrightText}</p>}</div>
        <div className="flex space-x-6">
          {footerItems.slice(13, 15).map((link, index) =>
            link.isExternal ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={index}
                to={link.href}
                className={({isActive, isPending}) =>
                  `hover:text-gray-400 ${isActive ? 'font-bold' : ''} ${
                    isPending ? 'text-gray-500' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'white',
  };
}

