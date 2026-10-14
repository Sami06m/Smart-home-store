import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch } from "../../app/store";
import { addToCart } from "../../features/cart/cartSlice";
import type { Product } from "../../features/products/product.types";
import {
  selectIsInWishlist,
  toggleWishlist,
} from "../../features/wishlist/wishlistSlice";
import { Badge } from "../common/Badge";
import { Button } from "../common/Button";
import { Card } from "../common/Card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  function handleAddToCart() {
    dispatch(addToCart(product.id));
  }

  function handleToggleWishlist() {
    dispatch(toggleWishlist(product.id));
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {!product.inStock && (
          <Badge variant="warning" className="absolute left-3 top-3">
            Out of Stock
          </Badge>
        )}

        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={handleToggleWishlist}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-600 backdrop-blur-sm transition hover:text-blue-600"
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            className={isInWishlist ? "fill-blue-600 text-blue-600" : ""}
          />
        </button>
      </div>

      <div className="px-3 py-3">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-slate-900 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span>{product.rating}</span>
        </div>

        <Button
          size="sm"
          className="mt-3 w-full"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </Button>
      </div>
    </Card>
  );
}
