import { create } from "zustand";

export const useProfileStore = create((set) => ({
  profiles: [],
  setItems: (profile) => set({ profile }),

  // Get item by ID
  getProfileById: async (id) => {
    try {
      const res = await fetch(`/api/profiles/${id}`, {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      return {
        success: true,
        data: data.data,
        message: "Profile retrieved successfully",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error fetching Profile" };
    }
  },

  // Create Profile
  createProfile: async (newProfile) => {
    if (!newProfile.user || !newProfile.bids || !newProfile.auctions) {
      return { success: false, message: "Please fill all fields" };
    }

    const res = await fetch("/api/profiles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProfile),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({ profiles: [...state.profiles, data.data] }));
    return { success: true, message: "Profile added from frontend" };
  },

  // Retrieve all Profiles
  getAllProfiles: async () => {
    try {
      const res = await fetch("/api/profiles", {
        method: "GET",
      });

      const data = await res.json();
      if (!res.ok) return { success: false, message: data.message };

      set({ profiles: data.data });
      return {
        success: true,
        data: data.data,
        message: "All Profiles retrieved",
      };
    } catch (error) {
      console.log(error);
      return { success: false, message: "Error fetching Profiles" };
    }
  },

  // Delete Profile
  deleteProfile: async (id) => {
    const res = await fetch(`/api/profiles/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      profiles: state.profiles.filter((profile) => profile._id !== id),
    }));

    return { success: true, message: "Profile deleted successfully" };
  },

  // Update Profile
  updateProfile: async (id, updatedProfile) => {
    const res = await fetch(`/api/profiles/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProfile),
    });

    const data = await res.json();
    if (!res.ok) return { success: false, message: data.message };

    set((state) => ({
      profile: state.profiles.map((profile) =>
        profile._id === id ? { ...profile, ...updatedProfile } : profile
      ),
    }));

    return { success: true, message: "Profile updated successfully" };
  },
}));
