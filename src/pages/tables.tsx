import { useState } from "react";
import { useGuestStore } from "../store/guestStore";
import { RxCross1 } from "react-icons/rx";
import type { Guest } from "../types/ghestType";

export default function Tables() {
  const { guests, removeFromTable } = useGuestStore() as any ;

  const [showModal, setShowModal] = useState(false);

  const tables = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Main */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-black/90 dark:text-white/90 sm:text-4xl">
              Gestion des Tables
            </h2>
            <p className="mt-2 text-black/60 dark:text-white/60">
              Assignez les invités aux tables et organisez votre événement.
            </p>
          </div>

          <div className=" gap-8">

            {/* Colonne tables */}
            <div className=" lg:w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tables.map((table, idx) => {
                  const assigned = guests.filter((g:Guest) => g.table === table && g.present);
                  return (
                    <div
                      key={idx+1}
                      className="bg-background-light dark:bg-background-dark/50 border border-black/10 dark:border-white/10 rounded-xl table-card flex flex-col"
                    >
                      <div className="p-4 border-b border-black/10 dark:border-white/10">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold text-black/90 dark:text-white/90">
                            Table {table}
                          </h4>
                          <div className="flex items-center gap-2 text-black/70 dark:text-white/70">
                            <span className="material-symbols-outlined text-base">
                              group
                            </span>
                            <span className="font-medium">
                              {assigned.length} / 10
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-3 flex-grow overflow-y-auto">
                        {assigned.length > 0 ? (
                          assigned.map((g:Guest) => (
                            <div
                              key={g.id}
                              className=" dark:bg-background-dark p-3 rounded-lg shadow-sm flex justify-between items-center guest-item"
                              draggable="true"
                            >
                              <p className="font-medium text-black/90 dark:text-white/90">
                                {g.name}
                              </p>
                              <button onClick={()=>removeFromTable(g.id)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300">
                                <span className="material-symbols-outlined text-lg">
                                  <RxCross1 />
                                </span>
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
          </div>
        </div>
      </main>

      {/* Modal Ajouter invité */}
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
                      className="w-full px-4 py-2 bg-white/50 dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-primary focus:border-primary text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-white/40"
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
                      rows={3}
                      placeholder="Informations supplémentaires..."
                      className="w-full px-4 py-2 bg-white/50 dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-primary focus:border-primary text-black/90 dark:text-white/90 placeholder-black/40 dark:placeholder-white/40"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-black/10 dark:bg-white/10 text-black/70 dark:text-white/70 font-semibold hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
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
