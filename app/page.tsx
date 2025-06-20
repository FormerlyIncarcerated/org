import AnimatedHero from "@/components/animated-hero"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <AnimatedHero />
      </main>
      <Footer />
    </div>
  )
}

