export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 pt-16 pb-12 text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">E</div>
              <span className="text-xl font-bold">EDU</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Des solutions logicielles intelligentes pour les écoles modernes au Maroc. Simplifiez la gestion, améliorez la communication.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Produit</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#modules" className="hover:text-primary transition-colors">Modules</a></li>
              <li><a href="#interfaces" className="hover:text-primary transition-colors">Interfaces</a></li>
              <li><a href="#avantages" className="hover:text-primary transition-colors">Avantages</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Demander une démo</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Solutions</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#modules" className="hover:text-primary transition-colors">Gestion scolaire</a></li>
              <li><a href="#modules" className="hover:text-primary transition-colors">Application mobile</a></li>
              <li><a href="#modules" className="hover:text-primary transition-colors">Communication</a></li>
              <li><a href="#modules" className="hover:text-primary transition-colors">Rapports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-lg">Contact</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="mailto:contact@edu.ma" className="hover:text-primary transition-colors">contact@edu.ma</a></li>
              <li><a href="https://edu.ma" className="hover:text-primary transition-colors">edu.ma</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Formulaire de contact</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© {currentYear} EDU. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
