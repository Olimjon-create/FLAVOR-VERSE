import { useState } from "react";
import { useMenu } from "@/hooks/use-menu";
import { MenuItemCard } from "@/components/ui/MenuItemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Utensils, Pizza, Coffee, Beer, IceCream, ChefHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: "All", label: "All Items", icon: Utensils },
  { id: "Main", label: "Main Courses", icon: ChefHat },
  { id: "Burgers", label: "Burgers", icon: ChefHat },
  { id: "Pizza", label: "Pizza", icon: Pizza },
  { id: "Drinks", label: "Drinks", icon: Beer },
  { id: "Dessert", label: "Desserts", icon: IceCream },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  
  const { data: items, isLoading, isError } = useMenu({ 
    category: selectedCategory === "All" ? undefined : selectedCategory,
    search: search || undefined
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-secondary/30 pt-12 pb-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-4">Our Menu</h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
            Explore our curated selection of dishes, crafted with passion and the finest ingredients.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative mb-12">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search dishes..."
              className="pl-10 h-12 rounded-2xl border-2 border-border focus:border-primary shadow-sm text-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`rounded-full h-11 px-6 transition-all duration-300 ${
                    isSelected 
                      ? "shadow-lg shadow-primary/25 scale-105" 
                      : "bg-background hover:bg-white hover:text-primary hover:border-primary/30"
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-2 ${isSelected ? "" : "text-muted-foreground"}`} />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="container mx-auto px-4 pt-12 max-w-7xl">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-card rounded-3xl h-[400px] animate-pulse border border-border/50" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-destructive mb-2">Oops! Something went wrong.</h3>
            <p className="text-muted-foreground">Failed to load menu items.</p>
          </div>
        ) : items?.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No items found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category.</p>
            <Button 
              variant="link" 
              onClick={() => { setSearch(""); setSelectedCategory("All"); }}
              className="mt-2 text-primary"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {items?.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuItemCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
