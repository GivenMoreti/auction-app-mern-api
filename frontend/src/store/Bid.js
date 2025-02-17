import { create } from "zustand";

export const useBidStore = create((set) => ({
  bids: [],
  setBids: (bid) => set({ bid }),

  // Get bid by ID
  getBidById: async (id) => {
    try {
      const res = await fetch(`/api/bids/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      return {
        success: true,
        data: data.data,
        message: "bid retrieved successfully",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error fetching bid" };
    }
  },

  // Create bid
  createBid: async (newBid) => {
    if (
      !newBid.item ||
      !newBid.startDate ||
      !newBid.BidPrice ||
      !newBid.endDate
    ) {
      return { success: false, message: "Please fill all fields" };
    }

    const res = await fetch("/api/bids", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBid),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({ bids: [...state.bids, data.data] }));
    return { success: true, message: "bid added from frontend" };
  },

  // Retrieve all bids
  getAllBids: async () => {
    try {
      const res = await fetch("/api/bids", {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      set({ bids: data.data });
      return {
        success: true,
        data: data.data,
        message: "All bids retrieved",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error fetching bids" };
    }
  },

  // Delete bid
  deleteBid: async (id) => {
    const res = await fetch(`/api/bids/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      bids: state.bids.filter((bid) => bid._id !== id),
    }));

    return { success: true, message: "Bid deleted successfully" };
  },

  // Update Bid
  updateBid: async (id, updatedBid) => {
    const res = await fetch(`/api/bids/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBid),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      bids: state.bids.map((bid) =>
        bid._id === id ? { ...bid, ...updatedBid } : bid
      ),
    }));

    return { success: true, message: "bid updated successfully" };
  },
}));
