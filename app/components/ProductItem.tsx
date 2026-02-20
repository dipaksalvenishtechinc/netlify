import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {ShoppingCart} from 'lucide-react';
import {toast} from 'react-hot-toast';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      toast.success(`${product.title} added to cart!`);
    }
  };

  return (
    <Link
      className="group border rounded-lg overflow-hidden shadow-lg flex flex-col hover:shadow-2xl hover:scale-105 transition-transform duration-300 !no-underline"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <Image
          alt={image.altText || product.title}
          aspectRatio="1/1"
          data={image}
          className="h-48 w-full object-cover group-hover:opacity-90"
          loading={loading}
        />
      )}

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg !font-semibold !mb-[0.25rem] !line-clamp-2">
          {product.title}
        </h2>
        <p className="!text-700 !text-sm !mb-[0.25rem]">
          <Money data={product.priceRange.minVariantPrice} />
        </p>
        {'description' in product && product.description && (
          <p className="text-600 text-[0.75rem] leading-[1rem] mb-2 line-clamp-3 mb-4">
            {product.description}
          </p>
        )}
        <div className="mt-auto pt-2 flex flex-col items-center ">
          <hr className="my-2 !border-t w-full" />
          <button
            type="button"
            onClick={handleAddToCart}
            className="!flex !items-center !justify-center !gap-2 !text-black !text-sm !px-3 !py-2 !rounded hover:!font-bold mt-3"
          >
            <ShoppingCart size={16} /> Add To Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
