import { useState } from "react";
import { useGuestStore } from "../store/guestStore";

export default function GuestList() {
  const { guests, togglePresence } = useGuestStore();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = guests.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-background-light dark:bg-background-dark/70 backdrop-blur-sm sticky top-0 z-20 border-b border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white p-2 rounded-full">
                <span className="material-symbols-outlined">festival</span>
              </div>
              <h1 className="text-lg font-bold text-black/90 dark:text-white/90">
                Guest Manager
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="flex items-center justify-center gap-2 bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                onClick={() => setShowModal(true)}
              >
                <span className="material-symbols-outlined">add</span>
                <span>Ajouter un invité</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
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
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40">
                  search
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
                      <th className="px-6 py-4 font-semibold text-black/80 dark:text-white/80">
                        Email
                      </th>
                      <th className="px-6 py-4 font-semibold text-black/80 dark:text-white/80 text-center">
                        Participant
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10 dark:divide-white/10">
                    {filtered.map((guest) => (
                      <tr
                        key={guest.id}
                        className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-black/80 dark:text-white/80">
                          {guest.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-black/80 dark:text-white/80">
                          {guest.email}
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
                          colSpan="3"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-background-light dark:bg-background-dark rounded-xl shadow-lg w-full max-w-md m-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-black/90 dark:text-white/90">
                  Ajouter un nouvel invité
                </h3>
                <button
                  className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="guestName"
                      className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1"
                    >
                      Nom
                    </label>
                    <input
                      id="guestName"
                      name="guestName"
                      type="text"
                      placeholder="Entrez le nom complet"
                      className="w-full px-4 py-2 bg-white/50 dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guestEmail"
                      className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="guestEmail"
                      name="guestEmail"
                      type="email"
                      placeholder="Entrez l'adresse email"
                      className="w-full px-4 py-2 bg-white/50 dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guestNotes"
                      className="block text-sm font-medium text-black/70 dark:text-white/70 mb-1"
                    >
                      Notes (optionnel)
                    </label>
                    <textarea
                      id="guestNotes"
                      name="guestNotes"
                      rows="3"
                      placeholder="Informations supplémentaires..."
                      className="w-full px-4 py-2 bg-white/50 dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-black/10 dark:bg-white/10 text-black/70 dark:text-white/70 font-semibold hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                    onClick={() => setShowModal(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Enregistrer l'invité
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
