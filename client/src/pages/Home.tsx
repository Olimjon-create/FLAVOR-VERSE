import { useMenu } from "@/hooks/use-menu";
import { MenuItemCard } from "@/components/ui/MenuItemCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ChevronRight, Star, Clock, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: items, isLoading } = useMenu();

  // Filter for popular items only
  const popularItems = items?.filter((item) => item.popular).slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Landing page hero food spread */}
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            alt="Delicious food spread" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-primary/90 text-primary-foreground text-sm font-bold mb-6 backdrop-blur-sm">
                Taste the Difference
              </span>
              <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
                Culinary <span className="text-primary">Excellence</span> in Every Bite
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
                Experience flavors that tell a story. Fresh ingredients, masterful preparation, and a menu designed to delight your senses.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu">
                  <Button size="lg" className="rounded-full text-lg h-14 px-8 bg-primary hover:bg-primary/90 shadow-xl hover:shadow-primary/30 transition-all">
                    Order Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 border-white text-white hover:bg-white hover:text-black backdrop-blur-sm">
                    Book a Table
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Star className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Premium Quality</h3>
              <p className="text-primary-foreground/80 text-sm">Only the finest ingredients</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Clock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Fast Delivery</h3>
              <p className="text-primary-foreground/80 text-sm">Hot food to your doorstep</p>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Truck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Free Shipping</h3>
              <p className="text-primary-foreground/80 text-sm">On orders over $50</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Items Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold mb-2">Popular Dishes</h2>
              <p className="text-muted-foreground">Our customers' absolute favorites</p>
            </div>
            <Link href="/menu">
              <Button variant="ghost" className="hidden sm:flex text-primary hover:text-primary/80 group">
                View Full Menu
                <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-3xl h-[400px] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MenuItemCard item={item} />
                </motion.div>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/menu">
              <Button variant="outline" className="w-full rounded-xl">
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-background container mx-auto px-4">
        <div className="bg-foreground rounded-[2.5rem] overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
             {/* Abstract pattern background */}
             <img 
              src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=1200&auto=format&fit=crop"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 px-8 py-16 md:py-24 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to experience the taste?
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
              Order now and get 20% off your first delivery with code <span className="text-primary font-bold">TASTY20</span>
            </p>
            <Link href="/menu">
              <Button size="lg" className="rounded-full text-lg h-14 px-10 bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl hover:shadow-primary/20 transition-all">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
