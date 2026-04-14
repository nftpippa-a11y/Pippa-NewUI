"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { usePiAuth } from "@/contexts/pi-auth-context";

interface MerchItem {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  inStock: boolean;
}

const merchItems: MerchItem[] = [
  {
    id: 1,
    name: "PIPPA Classic Tee",
    price: "0.05 ETH",
    image: "/placeholder.svg?height=300&width=300",
    category: "Apparel",
    inStock: true,
  },
  {
    id: 2,
    name: "Pie Character Hoodie",
    price: "0.12 ETH",
    image: "/placeholder.svg?height=300&width=300",
    category: "Apparel",
    inStock: true,
  },
  {
    id: 3,
    name: "NFT Collector Pin Set",
    price: "0.03 ETH",
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    inStock: true,
  },
  {
    id: 4,
    name: "PIPPA Art Print",
    price: "0.08 ETH",
    image: "/placeholder.svg?height=300&width=300",
    category: "Art",
    inStock: false,
  },
  {
    id: 5,
    name: "Limited Edition Cap",
    price: "0.06 ETH",
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    inStock: true,
  },
  {
    id: 6,
    name: "PIPPA Sticker Pack",
    price: "0.02 ETH",
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    inStock: true,
  },
];

export function ShopSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const { isAuthenticated, reinitialize } = usePiAuth();
  const categories = ["All", "Apparel", "Accessories", "Art"];

  const filteredItems =
    selectedCategory === "All"
      ? merchItems
      : merchItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="shop" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              PIPPA Merch Shop
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Exclusive merchandise for PIPPA holders. Show your love for pies in style!
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group">
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="secondary" className="text-base px-4 py-2">
                        Sold Out
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary text-primary-foreground">
                      {item.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-lg text-card-foreground">{item.name}</h3>
                    <p className="text-xl font-bold text-primary mt-1">{item.price}</p>
                  </div>
                  <Button
                    className="w-full"
                    disabled={!item.inStock}
                    variant={item.inStock ? "default" : "outline"}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Holder Benefits */}
          <Card className="mt-12 p-6 md:p-8 bg-accent text-accent-foreground">
            <div className="text-center space-y-4">
              <div className="text-4xl">🎁</div>
              <h3 className="text-2xl font-bold">Exclusive Holder Benefits</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
                PIPPA NFT holders get 20% off all merchandise, early access to new drops, and
                exclusive limited edition items!
              </p>
              <Button variant="secondary" size="lg" onClick={reinitialize}>
                {isAuthenticated ? "Wallet Connected" : "Connect Wallet to Unlock"}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
