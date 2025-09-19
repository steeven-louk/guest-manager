import { useState } from "react";
import { useGuestStore } from "../store/guestStore";

export default function GuestList() {
  const { guests, togglePresence } = useGuestStore();
  const [search, setSearch] = useState("");

  const filtered = guests.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Liste des invités</h1>
      <input
        type="text"
        placeholder="Rechercher..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul className="space-y-2">
        {filtered.map((g) => (
          <li key={g.id} className="flex items-center justify-between p-2 border rounded">
            <div>
              <span className="font-semibold">{g.name}</span>{" "}
              <span className="text-gray-500">- Table {g.table}</span>
            </div>
            <label>
              <input
                type="checkbox"
                checked={g.present}
                onChange={() => togglePresence(g.id)}
              />{" "}
              Présent
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
