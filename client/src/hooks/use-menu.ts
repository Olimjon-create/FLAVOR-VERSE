import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// GET /api/items - List all items
export function useMenu(filters?: { category?: string; search?: string }) {
  // Construct query key based on filters to ensure caching works per filter state
  const queryKey = [api.menu.list.path, filters?.category, filters?.search];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = new URL(api.menu.list.path, window.location.origin);
      if (filters?.category && filters.category !== "All") {
        url.searchParams.append("category", filters.category);
      }
      if (filters?.search) {
        url.searchParams.append("search", filters.search);
      }
      
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch menu items");
      
      return api.menu.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/items/:id - Get single item
export function useMenuItem(id: number) {
  return useQuery({
    queryKey: [api.menu.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.menu.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch menu item");
      
      return api.menu.get.responses[200].parse(await res.json());
    },
    enabled: !isNaN(id),
  });
}
