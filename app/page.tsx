"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu, ShoppingBag, Users, ImageIcon } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ShopSection } from "@/components/shop-section";
import { DaoSection } from "@/components/dao-section";
import { GallerySection } from "@/components/gallery-section";
import { usePiAuth } from "@/contexts/pi-auth-context";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, userData, reinitialize } = usePiAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <span className="text-2xl">🥧</span>
              </div>
              <span className="text-xl font-bold text-foreground">PIPPA</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="#about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link href="#gallery" className="text-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="#shop" className="text-foreground hover:text-primary transition-colors">
                Shop
              </Link>
              <Link href="#dao" className="text-foreground hover:text-primary transition-colors">
                DAO
              </Link>
              <Button onClick={reinitialize}>
                {isAuthenticated ? userData?.username || "Connected" : "Connect Wallet"}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-foreground" />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-border">
              <Link
                href="#about"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="#gallery"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="#shop"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="#dao"
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                DAO
              </Link>
              <Button className="w-full" onClick={reinitialize}>
                {isAuthenticated ? userData?.username || "Connected" : "Connect Wallet"}
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block">
              <div className="text-6xl md:text-8xl mb-4">🥧</div>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight">
              Welcome to <span className="text-primary">PIPPA</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Turning digital finance into a joyful, accessible experience. Join our pie-loving community bridging crypto, culture, and creativity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="text-lg">
                Explore Collection
              </Button>
              <Button size="lg" variant="outline" className="text-lg bg-transparent">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-foreground">
              What is PIPPA?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">NFT Collection</h3>
                <p className="text-muted-foreground text-pretty">
                  Unique pie character NFTs bringing joy and personality to the blockchain
                </p>
              </Card>
              <Card className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">Community Driven</h3>
                <p className="text-muted-foreground text-pretty">
                  A vibrant community of holders shaping the future through DAO governance
                </p>
              </Card>
              <Card className="p-6 space-y-4 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-accent/20 flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-bold text-card-foreground">Exclusive Merch</h3>
                <p className="text-muted-foreground text-pretty">
                  Access exclusive PIPPA merchandise and bring your favorite pie to life
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

      {/* Shop Section */}
      <ShopSection />

      {/* DAO Section */}
      <DaoSection />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-8 md:p-12 text-center space-y-6 bg-primary text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">
              Ready to Join the Pie Revolution?
            </h2>
            <p className="text-lg text-pretty opacity-90">
              Connect your wallet and become part of the sweetest NFT community in crypto
            </p>
            <Button size="lg" variant="secondary" className="text-lg" onClick={reinitialize}>
              {isAuthenticated ? "Wallet Connected" : "Connect Wallet"}
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xl">🥧</span>
              </div>
              <span className="font-bold text-foreground">PIPPA NFT</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 PIPPA. Bringing joy to digital finance.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Discord
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                OpenSea
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
