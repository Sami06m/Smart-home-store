import { Heart, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch } from "../../../app/store";
import { Badge } from "../../../components/common/Badge";
import { Button } from "../../../components/common/Button";
import { Container } from "../../../components/common/Container";
import { Navbar } from "../../../components/layout/Navbar";
import { addToCart } from "../../cart/cartSlice";
import {
  selectIsInWishlist,
  toggleWishlist,
} from "../../wishlist/wishlistSlice";
import { mockProducts } from "../mockProducts";

export function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const isInWishlist = useSelector(selectIsInWishlist(productId ?? ""));

  const product = mockProducts.find((item) => item.id === productId);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen">
          <Container>
            <div className="py-20 text-center">
              <h1 className="text-2xl font-bold text-slate-900">
                Product not found
              </h1>
              <Link
                to="/products"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                Back to products
              </Link>
            </div>
          </Container>
        </main>
      </>
    );
  }

  function handleAddToCart() {
    dispatch(addToCart(product!.id));
  }

  function handleToggleWishlist() {
    dispatch(toggleWishlist(product!.id));
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Container>
          <div className="pt-8">
            <Link
              to="/products"
              className="text-sm text-slate-500 hover:text-blue-600"
            >
              ← Back to products
            </Link>
          </div>

          <div className="grid gap-10 py-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-xl bg-slate-50">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-square w-full object-cover"
              />
            </div>

            <div>
              <Badge className="capitalize">{product.category}</Badge>

              <h1 className="mt-4 text-3xl font-bold text-slate-900">
                {product.name}
              </h1>

              <div className="mt-2 flex items-center gap-1 text-slate-500">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
              </div>

              <p className="mt-6 leading-7 text-slate-600">
                {product.description}
              </p>

              <p className="mt-4 text-sm font-medium">
                {product.inStock ? (
                  <span className="text-emerald-600">In stock</span>
                ) : (
                  <span className="text-amber-600">Out of stock</span>
                )}
              </p>

              <div className="mt-8 flex gap-3">
                <Button
                  size="lg"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  {product.inStock ? "Add to Cart" : "Unavailable"}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleToggleWishlist}
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={20}
                    className={
                      isInWishlist ? "fill-blue-600 text-blue-600" : ""
                    }
                  />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
