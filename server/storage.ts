import { db } from "./db";
import {
  menuItems,
  type MenuItem,
  type InsertMenuItem
} from "@shared/schema";
import { eq, like, or } from "drizzle-orm";

export interface IStorage {
  getMenuItems(search?: string, category?: string): Promise<MenuItem[]>;
  getMenuItem(id: number): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
}

export class DatabaseStorage implements IStorage {
  async getMenuItems(search?: string, category?: string): Promise<MenuItem[]> {
    let query = db.select().from(menuItems);
    
    // Simple in-memory filtering logic for this example or basic SQL construction
    // Since we want to chain, we can use a dynamic query builder approach
    
    // Note: Drizzle's query builder is immutable, so we need to reassign or construct conditions
    const conditions = [];
    if (category && category !== 'All') {
      conditions.push(eq(menuItems.category, category));
    }
    if (search) {
      conditions.push(like(menuItems.name, `%${search}%`));
    }
    
    if (conditions.length > 0) {
      // @ts-ignore - simple condition handling
      return await db.select().from(menuItems).where(or(...conditions));
    }
    
    return await db.select().from(menuItems);
  }

  async getMenuItem(id: number): Promise<MenuItem | undefined> {
    const [item] = await db.select().from(menuItems).where(eq(menuItems.id, id));
    return item;
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }
}

export const storage = new DatabaseStorage();
