"use client"

"use client"

import {
  Coins,
  Shield,
  Users,
  Vote,
  Zap,
  Globe,
  Lock,
  Wallet,
  Database,
  Network,
  FileText,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Hexagon
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

// Logo component with fallback
function ChainLogo({ chain }: { chain: any }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="relative w-12 h-12 mb-2">
      {!imageError ? (
        <Image
          src={chain.logo}
          alt={`${chain.name} logo`}
          fill
          className="object-contain filter drop-shadow-sm"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Hexagon className="w-8 h-8 text-primary" />
        </div>
      )}
    </div>
  )
}

export default function Web3Page() {
  // Empowering rotating text for our community
  const empoweringWords = [
    "Power",
    "Respect",
    "Value",
    "Diversity",
    "Capability",
    "Equality",
    "Autonomy",
    "Resilience"
  ]

  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % empoweringWords.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [empoweringWords.length])

  // Web3 Technologies and Blockchain Chains with logos
  const web3Chains = [
    {
      name: "Ethereum",
      symbol: "ETH",
      description: "Smart contracts & DeFi ecosystem",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg",
      color: "from-blue-400 to-purple-600"
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      description: "Layer 2 scaling solution",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Solana",
      symbol: "SOL",
      description: "High-speed blockchain",
      logo: "https://cryptologos.cc/logos/solana-sol-logo.svg",
      color: "from-green-400 to-blue-500"
    },
    {
      name: "Chainlink",
      symbol: "LINK",
      description: "Decentralized oracle network",
      logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg",
      color: "from-blue-500 to-cyan-400"
    },
    {
      name: "Filecoin",
      symbol: "FIL",
      description: "Decentralized storage network",
      logo: "https://cryptologos.cc/logos/filecoin-fil-logo.svg",
      color: "from-cyan-400 to-blue-600"
    },
    {
      name: "Uniswap",
      symbol: "UNI",
      description: "Decentralized exchange protocol",
      logo: "https://cryptologos.cc/logos/uniswap-uni-logo.svg",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "Aave",
      symbol: "AAVE",
      description: "Decentralized lending protocol",
      logo: "https://cryptologos.cc/logos/aave-aave-logo.svg",
      color: "from-purple-600 to-blue-500"
    },
    {
      name: "The Graph",
      symbol: "GRT",
      description: "Indexing protocol for Web3",
      logo: "https://cryptologos.cc/logos/the-graph-grt-logo.svg",
      color: "from-indigo-500 to-purple-600"
    },
    {
      name: "Arweave",
      symbol: "AR",
      description: "Permanent data storage",
      logo: "https://cryptologos.cc/logos/arweave-ar-logo.svg",
      color: "from-gray-600 to-gray-800"
    },
    {
      name: "Compound",
      symbol: "COMP",
      description: "Algorithmic money markets",
      logo: "https://cryptologos.cc/logos/compound-comp-logo.svg",
      color: "from-green-500 to-emerald-600"
    },
    {
      name: "Maker",
      symbol: "MKR",
      description: "Decentralized credit platform",
      logo: "https://cryptologos.cc/logos/maker-mkr-logo.svg",
      color: "from-teal-500 to-cyan-600"
    },
    {
      name: "Optimism",
      symbol: "OP",
      description: "Ethereum Layer 2 solution",
      logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.svg",
      color: "from-red-500 to-pink-500"
    }
  ]

  const web3Technologies = [
    {
      icon: Coins,
      title: "Digital Finance & Opportunity",
      description: "Secure, transparent pathways to financial empowerment and growth",
      useCases: [
        "Community-driven lending with fair opportunities",
        "Investment partnerships in local businesses",
        "Transparent funding for community programs",
        "Global connections for family support"
      ],
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: FileText,
      title: "Smart Agreements",
      description: "Automated systems that create trust and opportunity",
      useCases: [
        "Streamlined career placement programs",
        "Verified skills and achievement recognition",
        "Milestone-based success rewards",
        "Community-driven decision making"
      ],
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Privacy-First Identity",
      description: "Empowering individuals with control over their personal story",
      useCases: [
        "Merit-based opportunity matching",
        "Skills-focused credential verification",
        "Privacy-respecting background processes",
        "Secure personal document management"
      ],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Vote,
      title: "Community Governance",
      description: "Empowering collective decision-making and shared ownership",
      useCases: [
        "Community-led program development",
        "Transparent resource sharing",
        "Peer-supported application reviews",
        "Collaborative policy creation"
      ],
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: Database,
      title: "Secure Digital Storage",
      description: "Reliable, accessible storage for important documents and achievements",
      useCases: [
        "Protected personal document vault",
        "Professional portfolio showcase",
        "Permanent achievement records",
        "Open access to educational content"
      ],
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Network,
      title: "Open Financial Networks",
      description: "Inclusive financial services that welcome everyone",
      useCases: [
        "Trust-based lending opportunities",
        "Community investment growth",
        "Protective insurance solutions",
        "Automated wealth-building tools"
      ],
      color: "from-pink-500 to-rose-500"
    }
  ]

  const benefits = [
    {
      icon: Lock,
      title: "Privacy & Dignity",
      description: "Protecting personal stories while showcasing talents and achievements"
    },
    {
      icon: Users,
      title: "Community Leadership",
      description: "Empowering those with lived experience to guide positive change"
    },
    {
      icon: Globe,
      title: "Universal Access",
      description: "Opening doors to opportunities regardless of location or background"
    },
    {
      icon: TrendingUp,
      title: "Prosperity Building",
      description: "Creating sustainable pathways to financial success and independence"
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section - Enhanced Theme-Aware Styling */}
      <div className="w-full min-h-screen relative overflow-hidden">
        {/* Dynamic theme-aware background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-muted/30" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-secondary/5 to-accent/8" />

        {/* Enhanced pattern overlay with theme adaptation */}
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] pattern-overlay-theme" />

        <div className="container mx-auto relative z-10">
          <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
            {/* Enhanced badge with theme-aware contrast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="px-6 py-3 rounded-full border-2 border-primary/30 bg-card/90 dark:bg-card/80 backdrop-blur-md shadow-theme hover-glow transition-all duration-300">
                <p className="text-sm font-semibold text-primary dark:text-primary">✨ Honoring Dignity Through Technology</p>
              </div>
            </motion.div>

            {/* Main heading with rotating empowering text */}
            <motion.div
              className="flex gap-4 flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl max-w-4xl tracking-tighter text-center font-regular">
                <span className="text-gradient-readable font-bold">
                  Web 3 Empowers Us with
                </span>
                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                  &nbsp;
                  {empoweringWords.map((word, index) => (
                    <motion.span
                      key={index}
                      className="absolute font-semibold text-foreground text-shadow-theme-strong"
                      initial={{ opacity: 0, y: "-100" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        currentWordIndex === index
                          ? {
                              y: 0,
                              opacity: 1,
                            }
                          : {
                              y: currentWordIndex > index ? -150 : 150,
                              opacity: 0,
                            }
                      }
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
                <br />
                <span className="text-foreground font-semibold text-shadow-theme-strong">
                  By Default
                </span>
              </h1>

              <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-3xl text-center">
                Discover how revolutionary Web3 technologies restore dignity, create boundless opportunities,
                and empower our brothers and sisters to build the future they deserve. Together, we're pioneering
                innovations that honor our humanity and unlock unlimited potential.
              </p>
            </motion.div>

            {/* Enhanced CTA buttons with better contrast and styling */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="gap-3 w-full sm:w-auto gradient-button text-primary-foreground border-theme-strong shadow-theme-lg hover-lift font-bold text-base px-8 py-4 focus-visible-ring"
                asChild
              >
                <Link href="/survey">
                  Share Your Story <ArrowRight className="w-5 h-5 text-primary-foreground" />
                </Link>
              </Button>
              <Button
                size="lg"
                className="gap-3 w-full sm:w-auto border-theme-strong text-primary hover:bg-primary/15 hover:border-primary backdrop-blur-md bg-card/80 shadow-theme hover-lift font-semibold text-base px-8 py-4 focus-visible-ring"
                variant="outline"
                asChild
              >
                <Link href="/contact">
                  Build Together <Users className="w-5 h-5 text-primary" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Web3 Technologies & Chains Carousel */}
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-4">Building on Trusted Innovation</h2>
          <p className="text-muted-foreground">
            Partnering with the most reliable and empowering blockchain technologies
          </p>
        </div>

        {/* Turnstile Carousel */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-8 py-8">
            {/* First set of logos */}
            {web3Chains.map((chain, index) => (
              <div
                key={`first-${chain.name}`}
                className="flex-shrink-0 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${chain.color} p-1 hover-lift transition-all duration-300 group-hover:scale-110 shadow-theme`}>
                  <div className="w-full h-full rounded-xl bg-card/95 dark:bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 border-2 border-primary/20 dark:border-primary/30">
                    <ChainLogo chain={chain} />
                    <h3 className="text-sm font-semibold text-foreground dark:text-foreground text-center">{chain.name}</h3>
                    <p className="text-xs text-muted-foreground dark:text-muted-foreground text-center mt-1">{chain.symbol}</p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs text-muted-foreground max-w-32">{chain.description}</p>
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {web3Chains.map((chain, index) => (
              <div
                key={`second-${chain.name}`}
                className="flex-shrink-0 group"
                style={{ animationDelay: `${(index + web3Chains.length) * 0.1}s` }}
              >
                <div className={`relative w-32 h-32 rounded-2xl bg-gradient-to-br ${chain.color} p-1 hover-lift transition-all duration-300 group-hover:scale-110 shadow-theme`}>
                  <div className="w-full h-full rounded-xl bg-card/95 dark:bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center p-4 border-2 border-primary/20 dark:border-primary/30">
                    <ChainLogo chain={chain} />
                    <h3 className="text-sm font-semibold text-foreground dark:text-foreground text-center">{chain.name}</h3>
                    <p className="text-xs text-muted-foreground dark:text-muted-foreground text-center mt-1">{chain.symbol}</p>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs text-muted-foreground max-w-32">{chain.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* Web3 Technologies Grid */}
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Innovative Solutions for Positive Change</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Exploring how breakthrough technologies create pathways to opportunity and empowerment
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {web3Technologies.map((tech, index) => (
            <div
              key={tech.title}
              className="group relative overflow-hidden rounded-xl border-2 border-primary/20 dark:border-primary/30 bg-card/90 dark:bg-card/80 backdrop-blur-sm p-6 hover-lift transition-all duration-300 shadow-theme hover:shadow-theme-lg"
            >
              {/* Enhanced gradient background with theme awareness */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-5 dark:opacity-3 group-hover:opacity-10 dark:group-hover:opacity-8 transition-opacity`} />

              <div className="relative">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${tech.color} text-white shadow-lg mb-4`}>
                  <tech.icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground dark:text-foreground">{tech.title}</h3>
                <p className="text-muted-foreground dark:text-muted-foreground mb-4">{tech.description}</p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary dark:text-primary">Use Cases:</h4>
                  <ul className="space-y-1">
                    {tech.useCases.map((useCase, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground dark:text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-secondary dark:text-secondary mt-0.5 flex-shrink-0" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mx-auto mt-24 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Transformative Benefits</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            How innovative technology creates meaningful opportunities for everyone
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center group">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors mx-auto mb-4 shadow-theme">
                <benefit.icon className="h-8 w-8 text-primary dark:text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground dark:text-foreground">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground dark:text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Implementation Roadmap */}
      <div className="mx-auto mt-24 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Journey to Transformation</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our collaborative roadmap to building an empowering digital ecosystem
          </p>
        </div>

        <div className="space-y-8">
          {[
            {
              phase: "Phase 1",
              title: "Foundation & Trust",
              description: "Building secure identity systems and establishing community trust",
              timeline: "Q3-Q4 2025"
            },
            {
              phase: "Phase 2",
              title: "Opportunity & Voice",
              description: "Launching career platforms and empowering community leadership",
              timeline: "Q3-Q4 2025"
            },
            {
              phase: "Phase 3",
              title: "Growth & Prosperity",
              description: "Expanding financial opportunities and community investment tools",
              timeline: "Q1-Q2 2026"
            },
            {
              phase: "Phase 4",
              title: "Impact & Scale",
              description: "Connecting communities worldwide and maximizing positive impact",
              timeline: "Q3+ 2026"
            }
          ].map((item, index) => (
            <div key={item.phase} className="flex gap-6 p-6 rounded-xl border-2 border-primary/20 dark:border-primary/30 bg-card/80 dark:bg-card/70 backdrop-blur-sm shadow-theme hover:shadow-theme-lg transition-all duration-300">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground text-sm font-semibold shadow-lg">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-foreground dark:text-foreground">{item.phase}: {item.title}</h3>
                  <span className="text-sm text-muted-foreground dark:text-muted-foreground">{item.timeline}</span>
                </div>
                <p className="text-muted-foreground dark:text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mx-auto mt-24 max-w-4xl text-center">
        <div className="rounded-2xl border-2 border-primary/30 dark:border-primary/40 bg-gradient-to-br from-primary/8 via-secondary/6 to-accent/8 dark:from-primary/5 dark:via-secondary/4 dark:to-accent/5 p-8 md:p-12 shadow-theme-lg backdrop-blur-sm">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground dark:text-foreground">Ready to Shape the Future?</h2>
          <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-8">
            Join our movement and help create a world where technology empowers every individual to thrive
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gradient-button text-primary-foreground border-theme-strong shadow-theme-lg hover-lift font-bold focus-visible-ring" asChild>
              <Link href="/survey">
                Vote With Our Survey <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-theme-strong text-primary hover:bg-primary/12 hover:border-primary backdrop-blur-md bg-card/80 shadow-theme hover-glow font-semibold focus-visible-ring" asChild>
              <Link href="/contact">
                Connect With Us <Globe className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
