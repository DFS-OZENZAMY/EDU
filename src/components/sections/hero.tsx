import { Button } from "@/components/ui/button"
import { Play, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-40">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-10 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-widest text-primary bg-primary/5 ring-1 ring-primary/20 flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Conçu pour l'excellence au Maroc
            </span>
          </div>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 sm:text-7xl leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            La Gestion Scolaire <span className="text-primary italic">Cloud-Native</span>
          </h1>
          <p className="mt-8 text-xl font-medium leading-relaxed text-slate-500 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            EDU est la plateforme SaaS moderne qui unifie administration, pédagogie et finances. Éliminez la complexité, automatisez vos processus et offrez une expérience premium à vos parents.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black px-10 py-8 rounded-2xl shadow-2xl shadow-primary/20 text-sm tracking-widest uppercase transition-all active:scale-[0.98]" asChild>
              <a href="/register">DÉMARRER GRATUITEMENT →</a>
            </Button>
            <Button variant="ghost" size="lg" className="flex items-center gap-4 group px-8 py-8 rounded-2xl">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-900/10 group-hover:scale-110 transition-transform">
                <Play className="h-5 w-5 fill-current ml-0.5" />
              </div>
              <span className="text-xs font-black uppercase tracking-widest text-slate-900">VOIR LA DÉMO</span>
            </Button>
          </div>
        </div>

        <div className="mt-24 flow-root animate-in fade-in zoom-in duration-1000 delay-700">
          <div className="relative group p-4 rounded-[40px] bg-slate-100 ring-1 ring-inset ring-slate-200 shadow-inner">
            <div className="absolute -top-6 -right-6 h-24 w-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-indigo-100 rounded-full blur-3xl animate-pulse" />

            <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden relative z-10">
               <div className="h-[500px] w-full bg-slate-50 flex flex-col">
                  <div className="h-14 bg-white border-b flex items-center px-6 gap-2 justify-between">
                     <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-slate-200" />
                        <div className="h-3 w-3 rounded-full bg-slate-200" />
                        <div className="h-3 w-3 rounded-full bg-slate-200" />
                     </div>
                     <div className="h-6 w-48 bg-slate-50 rounded-full border border-slate-100" />
                     <div className="h-8 w-8 bg-slate-100 rounded-lg" />
                  </div>
                  <div className="flex-1 flex overflow-hidden">
                     <div className="w-56 border-r bg-white p-6 space-y-6">
                        <div className="h-10 bg-primary/5 rounded-xl border border-primary/10" />
                        <div className="space-y-3">
                            <div className="h-3 w-3/4 bg-slate-100 rounded-full" />
                            <div className="h-3 w-full bg-slate-50 rounded-full" />
                            <div className="h-3 w-5/6 bg-slate-100 rounded-full" />
                        </div>
                        <div className="pt-8 space-y-3">
                            <div className="h-3 w-1/2 bg-slate-100 rounded-full" />
                            <div className="h-3 w-2/3 bg-slate-100 rounded-full" />
                        </div>
                     </div>
                     <div className="flex-1 p-10 space-y-10 bg-slate-50/50">
                        <div className="grid grid-cols-3 gap-8">
                            <div className="h-32 bg-white border border-slate-100 rounded-3xl shadow-sm p-6" />
                            <div className="h-32 bg-white border border-slate-100 rounded-3xl shadow-sm p-6" />
                            <div className="h-32 bg-white border border-slate-100 rounded-3xl shadow-sm p-6" />
                        </div>
                        <div className="grid grid-cols-2 gap-8 flex-1">
                            <div className="h-48 bg-white border border-slate-100 rounded-3xl shadow-sm" />
                            <div className="h-48 bg-white border border-slate-100 rounded-3xl shadow-sm" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 gap-12 sm:grid-cols-3">
           <div className="flex flex-col items-center text-center group">
              <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/10">
                 <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-2">Déploiement Éclair</h3>
              <p className="text-sm font-bold text-slate-400 leading-relaxed">Votre instance SaaS activée et prête en moins de 24 heures.</p>
           </div>
           <div className="flex flex-col items-center text-center group">
              <div className="h-16 w-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/10">
                 <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-2">Sécurité Bancaire</h3>
              <p className="text-sm font-bold text-slate-400 leading-relaxed">Isolation totale des données par école et chiffrement de bout en bout.</p>
           </div>
           <div className="flex flex-col items-center text-center group">
              <div className="h-16 w-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/10">
                 <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-2">SaaS Multi-Tenant</h3>
              <p className="text-sm font-bold text-slate-400 leading-relaxed">Gérez plusieurs campus ou établissements depuis un compte unique.</p>
           </div>
        </div>
      </div>
    </section>
  )
}
