import { Button } from "@/components/ui/button"
import { Mail, Phone, MessageCircle } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-primary font-semibold tracking-wide uppercase">Contact</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Demandez votre place fondateur
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Remplissez ce formulaire et nous vous contactons sous 24h pour configurer votre accès gratuit.
            </p>
            <div className="mt-10 space-y-6">
               <a href="mailto:contact@edu.ma" className="flex items-center gap-4 text-gray-600 hover:text-primary transition-colors">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50">
                     <Mail className="h-5 w-5" />
                  </div>
                  <span className="font-medium">contact@edu.ma</span>
               </a>
               <div className="flex items-center gap-4 text-gray-600">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-50">
                     <Phone className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Support Local (Maroc)</span>
               </div>
               <div className="flex items-center gap-4 text-green-600">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-50">
                     <MessageCircle className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Support WhatsApp disponible</span>
               </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary outline-none transition-all"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="school" className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom de l'école
                  </label>
                  <input
                    type="text"
                    name="school"
                    id="school"
                    className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary outline-none transition-all"
                    placeholder="Nom de l'établissement"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary outline-none transition-all"
                  placeholder="contact@ecole.ma"
                  required
                />
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold text-gray-900 mb-2">
                  Numéro WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  id="whatsapp"
                  className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary outline-none transition-all"
                  placeholder="+212 600 000 000"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                  Votre message (optionnel)
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="block w-full rounded-xl border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary outline-none transition-all"
                  placeholder="Comment pouvons-nous vous aider ?"
                />
              </div>
              <Button variant="secondary" className="w-full h-14 text-lg font-bold shadow-lg" type="submit">
                Oui, je veux mes 6 mois gratuits →
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
