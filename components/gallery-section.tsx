"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, ExternalLink } from "lucide-react";
import { useState } from "react";

interface NFT {
  id: number;
  name: string;
  image: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  traits: string[];
  likes: number;
}

const nfts: NFT[] = [
  {
    id: 1,
    name: "Classic Cherry Pie",
    image: "/placeholder.svg?height=400&width=400",
    rarity: "Common",
    traits: ["Red Filling", "Golden Crust", "Happy Eyes"],
    likes: 234,
  },
  {
    id: 2,
    name: "Blueberry Delight",
    image: "/placeholder.svg?height=400&width=400",
    rarity: "Rare",
    traits: ["Blue Filling", "Sparkle Effect", "Sunglasses"],
    likes: 567,
  },
  {
    id: 3,
    name: "Cosmic Apple",
    image: "/placeholder.svg?height=400&width=400",
    rarity: "Epic",
    traits: ["Galaxy Filling", "Cosmic Aura", "Star Eyes"],
    likes: 892,
  },
  {
    id: 4,
    name: "Golden Pecan",
    image: "/placeholder.svg?height=400&width=400",
    rarity: "Legendary",
    traits: ["Golden Filling", "Crown", "Diamond Eyes", "Rare Smile"],
    likes: 1453,
  },
  {
    id: 5,
    name: "Pumpkin Spice",
    image: "/placeholder.svg?height=400&width=400",
    rarity: "Rare",
    traits: ["Orange Filling", "Autumn Vibes", "Cozy Expression"],
    likes: 678,
  },
  {
    id: 6,
    name: "Chocolate Dream",
    image: "/placeholder.svg?height=400&width=400",
    rarity: "Common",
    traits: ["Brown Filling", "Whipped Cream", "Content Face"],
    likes: 445,
  },
  {
    id: 7,
    name: "Lemon Zest",
    image: "/placeholder.svg?height=400&width=400",
    rarity: "Rare",
    traits: ["Yellow Filling", "Citrus Sparkle", "Excited Eyes"],
    likes: 523,
  },
  {
    id: 8,
    name: "Rainbow Supreme",
    image: "/placeholder.svg?height=400&width=400",
    rarity: "Epic",
    traits: ["Multi-Color", "Rainbow Aura", "Party Hat", "Celebration"],
    likes: 1021,
  },
];

export function GallerySection() {
  const [likedNFTs, setLikedNFTs] = useState<Set<number>>(new Set());
  const [selectedRarity, setSelectedRarity] = useState<string>("All");

  const rarities = ["All", "Common", "Rare", "Epic", "Legendary"];

  const filteredNFTs =
    selectedRarity === "All"
      ? nfts
      : nfts.filter((nft) => nft.rarity === selectedRarity);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-muted text-muted-foreground";
      case "Rare":
        return "bg-secondary text-secondary-foreground";
      case "Epic":
        return "bg-primary text-primary-foreground";
      case "Legendary":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const toggleLike = (nftId: number) => {
    setLikedNFTs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nftId)) {
        newSet.delete(nftId);
      } else {
        newSet.add(nftId);
      }
      return newSet;
    });
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
              PIPPA Collection Gallery
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Explore our delightful collection of unique pie character NFTs. Each one is crafted with love and personality!
            </p>
          </div>

          {/* Collection Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">10,000</div>
              <div className="text-xs text-muted-foreground">Total Supply</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">2.5 ETH</div>
              <div className="text-xs text-muted-foreground">Floor Price</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">8.2K</div>
              <div className="text-xs text-muted-foreground">Owners</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-foreground mb-1">125 ETH</div>
              <div className="text-xs text-muted-foreground">Volume</div>
            </Card>
          </div>

          {/* Rarity Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {rarities.map((rarity) => (
              <Button
                key={rarity}
                variant={selectedRarity === rarity ? "default" : "outline"}
                onClick={() => setSelectedRarity(rarity)}
                size="sm"
                className="rounded-full"
              >
                {rarity}
              </Button>
            ))}
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {filteredNFTs.map((nft) => {
              const isLiked = likedNFTs.has(nft.id);
              const displayLikes = nft.likes + (isLiked ? 1 : 0);

              return (
                <Card key={nft.id} className="overflow-hidden group">
                  <div className="relative aspect-square bg-muted overflow-hidden">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getRarityColor(nft.rarity)}>
                        <Sparkles className="w-3 h-3 mr-1" />
                        {nft.rarity}
                      </Badge>
                    </div>
                    <button
                      onClick={() => toggleLike(nft.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-colors hover:bg-background"
                      aria-label="Like NFT"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isLiked ? "fill-primary text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-lg text-card-foreground">{nft.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {displayLikes} likes
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {nft.traits.slice(0, 2).map((trait, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                      {nft.traits.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{nft.traits.length - 2}
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      View on OpenSea
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Mint Section */}
          <Card className="p-8 md:p-12 text-center space-y-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
            <div className="flex justify-center">
              <div className="text-6xl">🥧</div>
            </div>
            <h3 className="text-3xl font-bold text-foreground">Mint Your Own PIPPA</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join the pie revolution! Mint your unique PIPPA NFT and become part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Mint Now - 0.08 ETH
              </Button>
              <Button size="lg" variant="outline">
                View on OpenSea
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
