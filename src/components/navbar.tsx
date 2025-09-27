
import { MdManageAccounts } from "react-icons/md";

const Navbar = () => {

  return (
            <nav className="bg-background-light dark:bg-background-dark/70 backdrop-blur-sm sticky top-0 z-20 border-b border-black/10 dark:border-white/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo + Titre */}
              <div className="flex items-center">
                <div className="bg-primary text-white p-2 rounded-full">
                  <MdManageAccounts className="w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold text-black/90 dark:text-white/90">
                  Guest Manager
                </h1>
              </div>

              {/* Liens de navigation */}
              <div className="flex items-center gap-6">
                <a
                  href="/"
                  className="text-black/80 dark:text-white/80 hover:text-primary transition-colors font-medium"
                >
                  Invités
                </a>
                <a
                  href="/tables"
                  className="text-black/80 dark:text-white/80 hover:text-primary transition-colors font-medium"
                >
                  Tables
                </a>
              </div>
            </div>
          </div>
        </nav>

  )
}

export default Navbar