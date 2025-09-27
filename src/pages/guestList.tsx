import { useEffect, useState } from "react";
import { useGuestStore } from "../store/guestStore";
import { FaSearch } from "react-icons/fa";
import type { Guest } from "../types/ghestType";

export default function GuestList() {
  const { guests, fetchGuests, togglePresence, isLoading, error } = useGuestStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchGuests(); // charge les invités au montage
  }, [fetchGuests]);

  const filtered = guests?.filter((g: Guest) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );


  if (isLoading) {
    return <p className="text-center mt-8 animate-bounce">Chargement des invités...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Erreur : {error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-5xl w-full mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-black/90 dark:text-white/90 sm:text-4xl">
                Liste des invités
              </h2>
              <p className="mt-2 text-black/60 dark:text-white/60">
                Gérez et suivez les participants à votre événement.
              </p>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40">
                  <FaSearch />
                </span>
                <input
                  className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-primary focus:border-primary text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-white/40"
                  placeholder="Rechercher des invités..."
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Guest Table */}
            <div className="bg-background-light dark:bg-background-dark/50 border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-black/5 dark:bg-white/5">
                      <th className="px-6 py-4 font-semibold text-black/80 dark:text-white/80">
                        Nom
                      </th>
                      <th className="px-6 py-4 font-semibold text-black/80 dark:text-white/80 text-center">
                        Participant
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 dark:divide-white/10">
                    {filtered?.map((guest: Guest) => (
                      <tr
                        key={guest.id}
                        className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-black/80 dark:text-white/80">
                          {guest.name}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={guest.present}
                              onChange={() => togglePresence(guest.id)}
                              className="form-checkbox h-5 w-5 rounded border-black/20 dark:border-white/20 bg-transparent text-primary focus:ring-primary"
                            />
                          </label>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={2}
                          className="text-center py-6 text-black/60 dark:text-white/60"
                        >
                          Aucun invité trouvé
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
