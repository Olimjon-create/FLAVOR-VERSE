import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.menu.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const items = await storage.getMenuItems(search, category);
    res.json(items);
  });

  app.get(api.menu.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const item = await storage.getMenuItem(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getMenuItems();
  if (existing.length > 0) return;

  const seeds = [
    {
      name: "Classic Cheeseburger",
      description: "Juicy beef patty with cheddar cheese, lettuce, tomato, and our secret sauce on a brioche bun.",
      price: 1299,
      category: "Burgers",
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
      popular: true
    },
    {
      name: "Margherita Pizza",
      description: "Traditional wood-fired pizza with San Marzano tomato sauce, fresh mozzarella, and basil.",
      price: 1450,
      category: "Pizza",
      imageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80",
      popular: true
    },
    {
      name: "Spicy Chicken Wings",
      description: "Crispy fried wings tossed in our signature buffalo sauce, served with blue cheese dip.",
      price: 1099,
      category: "Starters",
      imageUrl: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&q=80",
      popular: false
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine lettuce, parmesan cheese, croutons, and creamy Caesar dressing.",
      price: 899,
      category: "Salads",
      imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&q=80",
      popular: false
    },
    {
      name: "Double Bacon Burger",
      description: "Two beef patties, crispy bacon, caramelized onions, and BBQ sauce.",
      price: 1599,
      category: "Burgers",
      imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=800&q=80",
      popular: true
    },
    {
      name: "Pepperoni Pizza",
      description: "Classic pizza topped with generous amounts of spicy pepperoni and mozzarella.",
      price: 1550,
      category: "Pizza",
      imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=80",
      popular: true
    },
    {
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten center, served with vanilla ice cream.",
      price: 799,
      category: "Desserts",
      imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&q=80",
      popular: true
    },
    {
      name: "Iced Caramel Macchiato",
      description: "Rich espresso layered with vanilla syrup, milk, and caramel drizzle.",
      price: 499,
      category: "Drinks",
      imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80",
      popular: false
    }
  ];

  for (const item of seeds) {
    await storage.createMenuItem(item);
  }
}
