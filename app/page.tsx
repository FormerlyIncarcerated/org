import { Metadata } from "next"
import AnimatedHero from "@/components/animated-hero"

export const metadata: Metadata = {
  title: "Home - Breaking Barriers, Building Futures",
  description: "Join the revolutionary Web3 platform empowering formerly incarcerated individuals through blockchain technology, decentralized job marketplace, and community-driven support systems. Start your second chance journey today.",
  keywords: [
    "formerly incarcerated empowerment",
    "Web3 reentry support",
    "blockchain second chances",
    "decentralized job marketplace",
    "criminal justice reform",
    "social impact platform",
    "community empowerment",
    "digital inclusion"
  ],
  openGraph: {
    title: "FormerlyIncarcerated.org - Breaking Barriers, Building Futures",
    description: "Revolutionary Web3 platform empowering formerly incarcerated individuals through blockchain technology and community support.",
    url: "https://formerlyincarcerated.org",
    type: "website",
  },
  twitter: {
    title: "FormerlyIncarcerated.org - Breaking Barriers, Building Futures",
    description: "Revolutionary Web3 platform empowering formerly incarcerated individuals through blockchain technology and community support.",
  },
}

export default function Home() {
  return (
    <main>
      <AnimatedHero />
    </main>
  )
}

