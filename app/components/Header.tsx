import {Suspense, useState} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import gildedLogo from '../assets/gilded-logo.png';
// Import icons
import {FiUser, FiSearch, FiShoppingCart, FiMenu} from 'react-icons/fi';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;

  return (
    <header className="header justify-center relative">
      <div className="opticon-container w-[1306px]">
        <SideBarMenu
          menu={menu}
          primaryDomainUrl={shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        <div className="flex justify-between h-[78px]">
          <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
            <img alt="" src={shop.brand?.logo?.image?.url}></img>
          </NavLink>
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
        <div className="flex justify-center mb-[-40px]">
          <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
        </div>
      </div>
    </header>
  );
}

// New SideBarMenu component
function SideBarMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const utilityMenuItems = (menu || FALLBACK_HEADER_MENU).items.slice(3, 7);

  return (
    <ul className="flex justify-end text-[14px] h-[20px] space-x-4  ">
      {utilityMenuItems.map((item) => {
        // Ensure item.url is a string before proceeding
        if (!item.url) {
          return null;
        }

        const itemUrlString = item.url; // TypeScript now knows this is a string after the check

        const url =
          itemUrlString.includes('myshopify.com') ||
          itemUrlString.includes(publicStoreDomain) ||
          itemUrlString.includes(primaryDomainUrl)
            ? new URL(itemUrlString).pathname
            : itemUrlString;

        return (
          <li key={item.id} className="!text-[#87857E]">
            <NavLink
              className="!text-[#87857E] "
              prefetch="intent"
              to={url} // 'url' is now guaranteed to be a string
              style={activeLinkStyle}
            >
              {item.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport} `;
  const {close} = useAside();

  const [isCollectionsDropdownOpen, setIsCollectionsDropdownOpen] =
    useState(false);

  const mainMenuItemsToDisplay =
    viewport === 'desktop'
      ? (menu || FALLBACK_HEADER_MENU).items.slice(0, 3)
      : (menu || FALLBACK_HEADER_MENU).items;

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {mainMenuItemsToDisplay.map((item) => {
        // Ensure item.url is a string before proceeding
        if (!item.url) {
          return null;
        }

        const itemUrlString = item.url; // TypeScript now knows this is a string after the check

        const url =
          itemUrlString.includes('myshopify.com') ||
          itemUrlString.includes(publicStoreDomain) ||
          itemUrlString.includes(primaryDomainUrl)
            ? new URL(itemUrlString).pathname
            : itemUrlString;

        if (item.title === 'COLLECTIONS' && viewport === 'desktop') {
          return (
            <div
              key={item.id}
              onMouseEnter={() => setIsCollectionsDropdownOpen(true)}
              onMouseLeave={() => setIsCollectionsDropdownOpen(false)}
            >
              <NavLink
                className="header-menu-item hover:underline underline-offset-4 hover:underline-offset-8 transition-all duration-300 ease-in-out"
                end
                onClick={close}
                prefetch="intent"
                style={activeLinkStyle}
                to={url} // 'url' is now guaranteed to be a string
              >
                {item.title}
              </NavLink>

              {isCollectionsDropdownOpen && (
                <div className="absolute left-0 mt-[-5px] right-0 top-[calc(100%+ 2px)] bg-white shadow-lg py-2 z-10 flex justify-center">
                  <div className="max-w-[1200px] w-full flex">
                    <div className="w-[263px]">
                      <h3 className="text-[#87857E] text-[18px] mb-4 font-big-caslon">
                        Discover Your Perfect Piece
                      </h3>
                      <ul className="space-y-2">
                        {['Rings', 'Necklace', 'Earrings', 'Bracelets'].map(
                          (item) => (
                            <li key={item}>
                              {/* Assuming these are hardcoded and not from item.url, so no changes needed here for now */}
                              <a
                                href={`/collections/${item
                                  .toLowerCase()
                                  .replace(/\s+/g, '-')}`}
                                className="font-mr-eaves text-[#2B2A2A] text-[18px] hover:text-[#87857E]"
                              >
                                {item}
                              </a>
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            className="header-menu-item hover:underline underline-offset-4 hover:underline-offset-8 transition-all duration-300  ease-in-out"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url} // 'url' is now guaranteed to be a string
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <HeaderMenuMobileToggle />
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
        <Suspense fallback={<FiUser size={24} />}>
          <Await resolve={isLoggedIn} errorElement={<FiUser size={24} />}>
            {(isLoggedIn) =>
              isLoggedIn ? <FiUser size={24} /> : <FiUser size={26} />
            }
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <FiMenu size={24} />
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset" onClick={() => open('search')}>
      <FiSearch size={24} />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      onClick={(e) => {
        e.preventDefault();

        const url = typeof window !== 'undefined' ? window.location.href : '';

        open('cart');

        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url,
        } as CartViewPayload);
      }}
      style={{display: 'flex', alignItems: 'center', gap: '4px'}}
    >
      <FiShoppingCart size={24} />
      {count === null ? <span>&nbsp;</span> : count}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'COLLECTIONS',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/EXTRA_ITEM_1',
      resourceId: null,
      tags: [],
      title: 'Gift Card',
      type: 'HTTP',
      url: '/gift-card',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/EXTRA_ITEM_2',
      resourceId: null,
      tags: [],
      title: 'Careers',
      type: 'HTTP',
      url: '/careers',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/EXTRA_ITEM_3',
      resourceId: null,
      tags: [],
      title: 'Wholesale',
      type: 'HTTP',
      url: '/wholesale',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/EXTRA_ITEM_4',
      resourceId: null,
      tags: [],
      title: 'Affiliates',
      type: 'HTTP',
      url: '/affiliates',
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
    color: isPending ? 'grey' : 'black',
  };
}
