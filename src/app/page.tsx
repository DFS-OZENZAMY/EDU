import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Benefits } from "@/components/sections/benefits";
import { Modules } from "@/components/sections/modules";
import { Interfaces } from "@/components/sections/interfaces";
import { Security } from "@/components/sections/security";
import { Pricing } from "@/components/sections/pricing";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Benefits />
        <Modules />
        <Interfaces />
        <Security />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
