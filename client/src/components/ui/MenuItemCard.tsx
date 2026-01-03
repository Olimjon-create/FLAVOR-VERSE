import { type MenuItemResponse } from "@shared/routes";
import { Link } from "wouter";
import { Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface MenuItemCardProps {
  item: MenuItemResponse;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicked on button
    e.stopPropagation();
    addToCart(item);
  };

  return (
    <Link href={`/menu/${item.id}`} className="group block h-full">
      <motion.div 
        whileHover={{ y: -5 }}
        className="h-full bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {item.popular && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              POPULAR
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <span className="text-white font-medium text-sm">View Details</span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-display font-bold text-xl text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <span className="font-sans font-bold text-lg text-primary">
              ${(item.price / 100).toFixed(2)}
            </span>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
            {item.description}
          </p>

          <Button 
            onClick={handleAddToCart}
            className="w-full rounded-xl font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Order
          </Button>
        </div>
      </motion.div>
    </Link>
  );
}
