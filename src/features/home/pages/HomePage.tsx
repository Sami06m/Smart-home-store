import { Badge } from "../../../components/common/Badge";
import { Button } from "../../../components/common/Button";
import { Container } from "../../../components/common/Container";
import { Navbar } from "../../../components/layout/Navbar";
import { ProductCard } from "../../../components/product/ProductCard";
import { mockProducts } from "../../products/mockProducts";
import { Link } from "react-router-dom";

export function HomePage() {
  const featuredProducts = mockProducts.filter((product) => product.featured);

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <section className="py-20">
          <Container>
            <div className="max-w-3xl">
              <Badge className="mb-6">Smart Home Technology</Badge>

              <h1 className="text-5xl font-bold tracking-tight text-slate-900 md:text-6xl">
                Make Your Home
                <br />
                <span className="text-blue-600">Smarter.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500">
                Discover smart devices that make your home more comfortable,
                secure, and connected.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/products">
                  <Button size="lg">Explore Products</Button>
                </Link>

                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-16">
          <Container>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Featured Products
                </h2>
                <p className="mt-1 text-slate-500">
                  Handpicked devices to get your smart home started.
                </p>
              </div>

              <Link to="/products">
                <Button variant="outline">View All</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
