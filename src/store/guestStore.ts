import { create } from "zustand";
import type { Guest } from "../types/ghestType";

// Générer 120 invités répartis sur 12 tables (10 par table)
const generateGuests = () => {
  const guests = [];
  for (let i = 1; i <= 120; i++) {
    guests.push({
      id: i,
      name: `Invité ${i}`,
    //   email: `invite${i}@example.com`,
      table: Math.ceil(i / 10), // 10 invités par table
      present: false,
    });
  }
  return guests;
};

export const useGuestStore = create((set) => ({
  guests: generateGuests(),

  togglePresence: (id:number) =>
    set((state: { guests: Guest[]; }) => ({
      guests: state.guests.map((g:Guest) =>
        g.id === id ? { ...g, present: !g.present } : g
      ),
    })),

  removeFromTable: (id:number) =>
    set((state: { guests: Guest[]; }) => ({
      guests: state.guests.map((g:Guest) =>
        g.id === id ? { ...g, present: false } : g
      ),
    })),
}));
