import { create } from "zustand";

export const useAuctionStore = create((set) => ({
  auctions: [],
  setAuctions: (auction) => set({ auction }),

  // Get auction by ID
  getAuctionById: async (id) => {
    try {
      const res = await fetch(`/api/auctions/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      return {
        success: true,
        data: data.data,
        message: "Auction retrieved successfully",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error fetching auction" };
    }
  },

  // Create auction
  createAuction: async (newAuction) => {
    if (
      !newAuction.item ||
      !newAuction.startDate ||
      !newAuction.auctionPrice ||
      !newAuction.endDate
    ) {
      return { success: false, message: "Please fill all fields" };
    }

    const res = await fetch("/api/auctions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAuction),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({ auctions: [...state.auctions, data.data] }));
    return { success: true, message: "Auction added from frontend" };
  },

  // Retrieve all auctions
  getAllAuctions: async () => {
    try {
      const res = await fetch("/api/auctions", {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      set({ auctions: data.data });
      return {
        success: true,
        data: data.data,
        message: "All auctions retrieved",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error fetching auctions" };
    }
  },

  // Delete auction
  deleteAuction: async (id) => {
    const res = await fetch(`/api/auctions/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      auctions: state.auctions.filter((auction) => auction._id !== id),
    }));

    return { success: true, message: "Auction deleted successfully" };
  },

  // Update auction
  updateAuction: async (id, updatedAuction) => {
    const res = await fetch(`/api/auctions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedAuction),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      auctions: state.auctions.map((auction) =>
        auction._id === id ? { ...auction, ...updatedAuction } : auction
      ),
    }));

    return { success: true, message: "Auction updated successfully" };
  },
}));
