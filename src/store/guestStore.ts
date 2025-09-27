import { create } from "zustand";
import type { Guest } from "../types/ghestType";
import { supabase } from "../utils/supabase";


interface GuestState {
  guests: Guest[];
  isLoading: boolean;
  error: string | null;
  fetchGuests: () => Promise<void>;
  togglePresence: (id: number) => Promise<void>;
  removeFromTable: (id: number) => Promise<void>;
}

export const useGuestStore = create<GuestState>((set, get) => ({
  guests: [],
  isLoading: false,
  error: null,

  // Charger tous les invités
  fetchGuests: async () => {
    try {
      set({ isLoading: true, error: null });
    const { data: guests, error } = await supabase
      .from("guests")
      .select()
      .order("present", { ascending: true });

    if (error) {
      console.error("Error fetching guests:", error);
      set({
        error: error.message || "Failed to fetch guests",
        isLoading: false,
      });
    } else {
      set({ guests: guests as Guest[], isLoading: false });
    }
    } catch (error) {
      console.log(error)
    }
  },

  // Toggle presence et sauvegarde dans Supabase
  togglePresence: async (id: number) => {
   try {
     const guest = get().guests.find((g) => g.id === id);
    if (!guest) return;

    const updatedPresence = !guest.present;
    console.log("updatedPresence", updatedPresence);

    // Optimistic update
    set((state) => ({
      guests: state.guests.map((g) =>
        g.id === id ? { ...g, present: updatedPresence } : g
      ),
    }));

    const { error } = await supabase
      .from("guests")
      .update({ present: updatedPresence })
      .eq("id", id);

      
    if (error) {
      console.error("Erreur update:", error);
      // rollback si erreur
      set((state) => ({
        guests: state.guests.map((g) =>
          g.id === id ? { ...g, present: guest.present } : g
        ),
      }));
    } else {
      // recharge la liste depuis la DB pour être sûr
      await get().fetchGuests();
    }
   } catch (error) {
    console.log(error)
   }
  },

  // Supprimer de la table (met "present" à false et supprime la table associée)
  removeFromTable: async (id: number) => {
   try {
     const guest = get().guests.find((g) => g.id === id);
    if (!guest) return;

    // Optimistic update
    set((state) => ({
      guests: state.guests.map((g) =>
        g.id === id
          ? { ...g, present: false }
          : g
      ),
    }));

    const { error } = await supabase
      .from("guests")
      .update({ present: false })
      .eq("id", id);

    if (error) {
      console.error("Erreur update:", error);
      // rollback si erreur
      set((state) => ({
        guests: state.guests.map((g) => (g.id === id ? guest : g)),
      }));
    }else{
      //recharge la liste
      await get().fetchGuests();
    }

   } catch (error) {
    console.log(error)
   }
  },
}));
