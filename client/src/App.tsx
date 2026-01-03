import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { Navbar } from "@/components/layout/Navbar";
import { AnimatePresence, motion } from "framer-motion";

// Pages
import Home from "@/pages/Home";
import Menu from "@/pages/Menu";
import MenuItemDetail from "@/pages/MenuItemDetail";
import Cart from "@/pages/Cart";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Wrapper for page transitions
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/">
          <PageTransition>
            <Home />
          </PageTransition>
        </Route>
        
        <Route path="/menu">
          <PageTransition>
            <Menu />
          </PageTransition>
        </Route>
        
        <Route path="/menu/:id">
          <PageTransition>
            <MenuItemDetail />
          </PageTransition>
        </Route>
        
        <Route path="/cart">
          <PageTransition>
            <Cart />
          </PageTransition>
        </Route>
        
        <Route path="/contact">
          <PageTransition>
            <Contact />
          </PageTransition>
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            <Navbar />
            <main className="flex-grow">
              <Router />
            </main>
            <Toaster />
            
            {/* Simple Footer */}
            <footer className="bg-foreground text-background py-12">
              <div className="container mx-auto px-4 text-center">
                <p className="font-display font-bold text-2xl mb-4">Cravify</p>
                <div className="flex justify-center space-x-6 mb-8 text-sm opacity-80">
                  <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                  <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                  <a href="#" className="hover:text-primary transition-colors">Facebook</a>
                </div>
                <p className="text-xs opacity-50">
                  © {new Date().getFullYear()} Cravify Restaurant. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
