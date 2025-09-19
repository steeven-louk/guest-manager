import { create } from "zustand";

const initialGuests = [
  { id: 1, name: "Sophia Clark", table: 1, present: false },
  { id: 2, name: "Ethan Miller", table: 2, present: false },
  { id: 3, name: "Olivia Davis", table: 1, present: false },
  { id: 4, name: "Liam Wilson", table: 3, present: false },
  { id: 5, name: "Ava Taylor", table: 4, present: true },
];

export const useGuestStore = create((set) => ({
  guests: initialGuests,
  togglePresence: (id:number) =>
    set((state) => ({
      guests: state.guests.map((g) =>
        g.id === id ? { ...g, present: !g.present } : g
      ),
    })),
}));
