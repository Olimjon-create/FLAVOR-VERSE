import { useRoute } from "wouter";
import { useMenuItem } from "@/hooks/use-menu";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star, Clock, Flame } from "lucide-react";
import { Link } from "wouter";

export default function MenuItemDetail() {
  const [, params] = useRoute("/menu/:id");
  const id = parseInt(params?.id || "0");
  const { data: item, isLoading, isError } = useMenuItem(id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold mb-4">Item not found</h2>
        <Link href="/menu">
          <Button>Back to Menu</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(item, quantity);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Navigation breadcrumb area */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/menu">
          <Button variant="ghost" className="hover:bg-transparent pl-0 hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Menu
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Image Side */}
          <div className="relative group">
            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative z-10 bg-white">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Decorative background blob */}
            <div className="absolute -inset-4 bg-primary/10 rounded-[3.5rem] -z-10 rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col justify-center">
            {item.popular && (
              <div className="inline-flex items-center space-x-2 text-accent font-bold uppercase tracking-wider text-sm mb-4">
                <Flame className="w-5 h-5" />
                <span>Popular Choice</span>
              </div>
            )}
            
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
              {item.name}
            </h1>
            
            <div className="flex items-center space-x-6 mb-8 text-muted-foreground">
              <span className="font-display text-4xl text-primary font-bold">
                ${(item.price / 100).toFixed(2)}
              </span>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="font-medium text-foreground">4.8</span>
                <span className="ml-1 text-sm">(124 reviews)</span>
              </div>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-sm">20-30 min</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              {item.description}
            </p>

            <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Quantity Control */}
                <div className="flex items-center justify-between bg-secondary/50 rounded-2xl p-2 sm:w-40">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-xl hover:bg-white hover:text-destructive"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-bold font-sans w-8 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-xl hover:bg-white hover:text-primary"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {/* Add to Cart Button */}
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="flex-1 rounded-2xl text-lg h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5 mr-3" />
                  Add to Cart — ${((item.price * quantity) / 100).toFixed(2)}
                </Button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-secondary/20 border border-secondary">
                <h4 className="font-bold mb-1">Ingredients</h4>
                <p className="text-sm text-muted-foreground">Fresh, locally sourced, organic when possible.</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/20 border border-secondary">
                <h4 className="font-bold mb-1">Allergens</h4>
                <p className="text-sm text-muted-foreground">Contains gluten, dairy. Ask server for details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
