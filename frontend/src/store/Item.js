import { create } from "zustand";

export const useItemStore = create((set) => ({
  items: [],
  setItems: (item) => set({ item }),

  // Get item by ID
  getItemById: async (id) => {
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      return {
        success: true,
        data: data.data,
        message: "item retrieved successfully",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error fetching item" };
    }
  },

  // Create item
  createItem: async (newItem) => {
    if (
      !newItem.imgUrl ||
      !newItem.title ||
      !newItem.price ||
      !newItem.description ||
      !newItem.tags
    ) {
      return { success: false, message: "Please fill all fields" };
    }

    const res = await fetch("/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({ items: [...state.items, data.data] }));
    return { success: true, message: "item added from frontend" };
  },

  // Retrieve all items
  getAllItems: async () => {
    try {
      const res = await fetch("/api/items", {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      set({ items: data.data });
      return {
        success: true,
        data: data.data,
        message: "All items retrieved",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error fetching Items" };
    }
  },

  // Delete item
  deleteItem: async (id) => {
    const res = await fetch(`/api/items/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    }));

    return { success: true, message: "item deleted successfully" };
  },

  // Update item
  updateItem: async (id, updatedItem) => {
    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      items: state.items.map((item) =>
        item._id === id ? { ...item, ...updatedItem } : item
      ),
    }));

    return { success: true, message: "item updated successfully" };
  },
}));
