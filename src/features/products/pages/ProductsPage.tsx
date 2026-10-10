import { useState } from "react";
import { Container } from "../../../components/common/Container";
import { Button } from "../../../components/common/Button";
import { Navbar } from "../../../components/layout/Navbar";
import { ProductCard } from "../../../components/product/ProductCard";
import { mockProducts } from "../mockProducts";
import type { ProductCategory } from "../product.types";

const PRODUCTS_PER_PAGE = 8;

const categories: { label: string; value: ProductCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Lighting", value: "lighting" },
  { label: "Security", value: "security" },
  { label: "Climate", value: "climate" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Automation", value: "automation" },
  { label: "Sensors", value: "sensors" },
  { label: "Accessories", value: "accessories" },
];

export function ProductsPage() {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | "all"
  >("all");

  const matchingProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const visibleProducts = matchingProducts.slice(0, visibleCount);
  const hasMore = visibleCount < matchingProducts.length;

  function handleLoadMore() {
    setVisibleCount(visibleCount + PRODUCTS_PER_PAGE);
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }

  function handleCategoryChange(category: ProductCategory | "all") {
    setSelectedCategory(category);
    setVisibleCount(PRODUCTS_PER_PAGE);
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Container>
          <div className="py-10">
            <h1 className="text-3xl font-bold text-slate-900">All Products</h1>
            <p className="mt-2 text-slate-500">
              Browse our full collection of smart home devices.
            </p>

            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="mt-6 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 sm:max-w-sm"
            />

            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  size="sm"
                  variant={
                    selectedCategory === category.value ? "primary" : "outline"
                  }
                  onClick={() => handleCategoryChange(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <p className="py-10 text-center text-slate-500">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center py-10">
              <Button variant="outline" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          )}
        </Container>
      </main>
    </>
  );
}
