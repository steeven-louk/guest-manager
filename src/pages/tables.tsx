"use client";
import { useEffect, useState } from "react";
import { useGuestStore } from "../store/guestStore";
import type { Guest } from "../types/ghestType";
import { RxCross1 } from "react-icons/rx";

function normalizeString(str: string) {
  return str
    .normalize("NFD") // décompose les lettres accentuées
    .replace(/[\u0300-\u036f]/g, "") // supprime les diacritiques
    .toLowerCase();
}

function matchesSearch(name: string, query: string) {
  const normName = normalizeString(name);
  const words = normalizeString(query).split(" ").filter(Boolean);

  // Chaque mot de la recherche doit être présent dans le nom
  return words.every((word) => normName.includes(word));
}

export default function Tables() {
  const { guests, removeFromTable, fetchGuests, isLoading } = useGuestStore();
  const [search, setSearch] = useState("");
console.log(guests)

  const tables = Array.from(
    new Set(guests.filter((g:Guest) => g.present && g.table).map((g) => g.table))
  ).sort((a, b) => (a ?? 0) - (b ?? 0));

    useEffect(() => {
      fetchGuests(); // charge les invités au montage
    }, [fetchGuests]);
      if (isLoading) {
    return <p className="text-center mt-8 animate-bounce">Chargement des tables...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher par nom ou numéro de table..."
        className="w-full p-2 border rounded-md mb-4"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table, idx) => {
          const assigned = guests.filter(
            (g: Guest) => g.table === table && g.present
          );

          const visible = assigned.filter((g: Guest) => {
            if (!search) return true;
            const query = normalizeString(search);
            return (
              matchesSearch(g.name, query) ||
              (g.table && g.table.toString().includes(query))
            );
          });

          // si recherche active et aucun résultat → on cache la carte
          if (search && visible.length === 0) return null;

          return (
            <div
              key={idx + 1}
              className="bg-background-light dark:bg-background-dark/50 border border-black/10 dark:border-white/10 rounded-xl table-card flex flex-col"
            >
              <div className="p-4 border-b border-black/10 dark:border-white/10">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold text-black/90 dark:text-white/90">
                    Table {table}
                  </h4>
                  <div className="flex items-center gap-2 text-black/70 dark:text-white/70">
                    <span className="material-symbols-outlined text-base">
                      groupe
                    </span>
                    <span className="font-medium">
                      {visible.length} / 10
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-grow overflow-y-auto">
                {visible.length > 0 ? (
                  visible.map((g: Guest) => (
                    <div
                      key={g.id}
                      className="rounded-lg shadow-sm flex justify-between items-center"
                    >
                      <p className="font-medium pl-2 text-black/90 dark:text-white/90">
                        {g.name}
                      </p>
                      <button
                        onClick={() => removeFromTable(g.id)}
                        className="text-red-500 bg-green-500 hover:text-red-700 transition-colors rounded-full"
                      >
                        <RxCross1 />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-black/50 dark:text-white/50">
                      Aucun invité pour cette table
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
