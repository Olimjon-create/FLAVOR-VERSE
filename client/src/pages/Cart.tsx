import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Order Placed Successfully! 🎉",
      description: "We're preparing your delicious meal now.",
      duration: 5000,
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="bg-secondary/30 p-8 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-sm">
          Looks like you haven't added anything delicious to your cart yet.
        </p>
        <Link href="/menu">
          <Button size="lg" className="rounded-full px-8">
            Browse Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="font-display text-4xl font-bold mb-8">Your Order</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-card rounded-2xl p-4 sm:p-6 shadow-sm border border-border/50 flex flex-col sm:flex-row gap-6 items-center"
                >
                  {/* Item Image */}
                  <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-primary font-bold">
                      ${(item.price / 100).toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-secondary/30 rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-md"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center font-bold text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-md"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  {/* Remove Button */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="flex justify-between items-center pt-4">
              <Link href="/menu">
                <Button variant="ghost" className="hover:bg-transparent pl-0 hover:text-primary">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continue Ordering
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-3xl p-8 shadow-lg border border-border sticky top-24">
              <h2 className="font-display text-2xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${(cartTotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (8%)</span>
                  <span>${((cartTotal * 0.08) / 100).toFixed(2)}</span>
                </div>
                <div className="h-px bg-border my-4"></div>
                <div className="flex justify-between text-xl font-bold text-foreground">
                  <span>Total</span>
                  <span>${((cartTotal * 1.08) / 100).toFixed(2)}</span>
                </div>
              </div>

              <Button 
                onClick={handleCheckout}
                size="lg" 
                className="w-full rounded-xl text-lg h-14 bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-primary/25 transition-all"
              >
                Checkout Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Secure checkout provided by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
