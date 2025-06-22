"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Coins, 
  Shield, 
  Database, 
  Network, 
  FileText, 
  Vote,
  Zap,
  Lock,
  Globe,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Hexagon,
  Layers,
  Key,
  Smartphone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface Web3Technology {
  id: string
  name: string
  description: string
  icon: React.ComponentType<any>
  category: "defi" | "identity" | "governance" | "infrastructure"
  maturity: number // 0-100
  adoptionLevel: "experimental" | "emerging" | "established" | "mainstream"
  benefits: string[]
  challenges: string[]
  realWorldApplications: {
    title: string
    description: string
    impact: string
  }[]
  technicalDetails: {
    consensus: string
    scalability: string
    security: string
    interoperability: string
  }
  timeline: {
    research: string
    development: string
    pilot: string
    deployment: string
  }
}

const web3Technologies: Web3Technology[] = [
  {
    id: "defi-protocols",
    name: "Decentralized Finance (DeFi)",
    description: "Open financial systems that provide banking services without traditional intermediaries",
    icon: Coins,
    category: "defi",
    maturity: 75,
    adoptionLevel: "established",
    benefits: [
      "24/7 global access to financial services",
      "Lower fees than traditional banking",
      "Transparent and auditable transactions",
      "No credit checks or discrimination",
      "Programmable money and automated services"
    ],
    challenges: [
      "Technical complexity for new users",
      "Regulatory uncertainty",
      "Smart contract risks",
      "Price volatility"
    ],
    realWorldApplications: [
      {
        title: "Micro-lending for Entrepreneurs",
        description: "Peer-to-peer lending pools that provide small business loans based on community trust rather than credit scores",
        impact: "Enables 500+ formerly incarcerated individuals to start businesses"
      },
      {
        title: "Savings and Investment Circles",
        description: "Automated savings groups where members contribute regularly and earn yields through DeFi protocols",
        impact: "Average 12% annual returns vs 0.1% traditional savings"
      }
    ],
    technicalDetails: {
      consensus: "Proof of Stake on Ethereum, Polygon",
      scalability: "Layer 2 solutions, 1000+ TPS",
      security: "Multi-signature wallets, audited smart contracts",
      interoperability: "Cross-chain bridges, universal protocols"
    },
    timeline: {
      research: "Q3 2025",
      development: "Q4 2025",
      pilot: "Q1 2026",
      deployment: "Q2 2026"
    }
  },
  {
    id: "self-sovereign-identity",
    name: "Self-Sovereign Identity (SSI)",
    description: "Digital identity systems that give individuals complete control over their personal data",
    icon: Shield,
    category: "identity",
    maturity: 60,
    adoptionLevel: "emerging",
    benefits: [
      "Complete control over personal data",
      "Privacy-preserving credential verification",
      "Reduced identity theft risk",
      "Portable credentials across platforms",
      "Selective disclosure of information"
    ],
    challenges: [
      "Complex key management",
      "Limited ecosystem adoption",
      "User education requirements",
      "Recovery mechanisms"
    ],
    realWorldApplications: [
      {
        title: "Skills-Based Employment Matching",
        description: "Verified credentials that showcase abilities without revealing criminal history until relevant",
        impact: "75% increase in interview callbacks for skilled positions"
      },
      {
        title: "Privacy-Preserving Background Checks",
        description: "Selective disclosure allows sharing only relevant information for specific opportunities",
        impact: "Reduces discrimination while maintaining necessary transparency"
      }
    ],
    technicalDetails: {
      consensus: "Decentralized identifiers (DIDs) on multiple blockchains",
      scalability: "Off-chain credential storage, on-chain verification",
      security: "Zero-knowledge proofs, cryptographic signatures",
      interoperability: "W3C standards, cross-platform compatibility"
    },
    timeline: {
      research: "Q2 2025",
      development: "Q3 2025",
      pilot: "Q4 2025",
      deployment: "Q1 2026"
    }
  },
  {
    id: "dao-governance",
    name: "Decentralized Autonomous Organizations (DAOs)",
    description: "Community-governed organizations where decisions are made collectively through token voting",
    icon: Vote,
    category: "governance",
    maturity: 65,
    adoptionLevel: "emerging",
    benefits: [
      "Democratic decision-making",
      "Transparent governance processes",
      "Global participation",
      "Automated execution of decisions",
      "Reduced bureaucracy"
    ],
    challenges: [
      "Voter apathy and low participation",
      "Governance token concentration",
      "Technical barriers to participation",
      "Legal and regulatory uncertainty"
    ],
    realWorldApplications: [
      {
        title: "Community Resource Allocation",
        description: "Democratic voting on how to distribute funding for reentry programs and services",
        impact: "85% community satisfaction with resource allocation decisions"
      },
      {
        title: "Policy Development",
        description: "Collaborative creation of platform rules and community guidelines",
        impact: "Increased community ownership and compliance with policies"
      }
    ],
    technicalDetails: {
      consensus: "Token-weighted voting, quadratic voting options",
      scalability: "Snapshot voting, Layer 2 governance",
      security: "Multi-signature execution, timelock delays",
      interoperability: "Cross-DAO collaboration protocols"
    },
    timeline: {
      research: "Q1 2025",
      development: "Q2 2025",
      pilot: "Q3 2025",
      deployment: "Q4 2025"
    }
  },
  {
    id: "ipfs-storage",
    name: "Decentralized Storage (IPFS)",
    description: "Distributed file storage system that ensures data permanence and accessibility",
    icon: Database,
    category: "infrastructure",
    maturity: 70,
    adoptionLevel: "established",
    benefits: [
      "Censorship-resistant storage",
      "Permanent data availability",
      "Reduced storage costs",
      "Global content distribution",
      "Version control and integrity"
    ],
    challenges: [
      "Incentive mechanisms for storage",
      "Data retrieval speed",
      "Storage provider reliability",
      "User interface complexity"
    ],
    realWorldApplications: [
      {
        title: "Permanent Achievement Records",
        description: "Immutable storage of educational certificates, job training completions, and skill verifications",
        impact: "100% verifiable credentials that can't be lost or falsified"
      },
      {
        title: "Community Resource Library",
        description: "Decentralized storage of educational materials, legal resources, and community guides",
        impact: "Always-accessible resources for community members worldwide"
      }
    ],
    technicalDetails: {
      consensus: "Content addressing, distributed hash tables",
      scalability: "Sharding, caching layers, CDN integration",
      security: "Cryptographic hashing, redundant storage",
      interoperability: "HTTP gateways, blockchain integration"
    },
    timeline: {
      research: "Q2 2025",
      development: "Q3 2025",
      pilot: "Q4 2025",
      deployment: "Q1 2026"
    }
  }
]

const categoryColors = {
  defi: "from-green-500 to-emerald-500",
  identity: "from-blue-500 to-cyan-500",
  governance: "from-purple-500 to-violet-500",
  infrastructure: "from-orange-500 to-red-500"
}

const adoptionColors = {
  experimental: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
  emerging: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300",
  established: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
  mainstream: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
}

export default function Web3TechnologiesShowcase() {
  const [selectedTech, setSelectedTech] = useState<Web3Technology>(web3Technologies[0])

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/20">
            <Hexagon className="w-4 h-4 mr-2" />
            Technology Deep Dive
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Web3 Technologies Powering Change
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the cutting-edge technologies that will transform how formerly incarcerated 
            individuals access opportunities, build wealth, and participate in their communities.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Technology List */}
        <div className="lg:col-span-1 space-y-4">
          {web3Technologies.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  selectedTech.id === tech.id ? 'border-primary shadow-lg' : 'hover:border-primary/30'
                }`}
                onClick={() => setSelectedTech(tech)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[tech.category]} text-white`}>
                      <tech.icon className="w-5 h-5" />
                    </div>
                    <Badge className={adoptionColors[tech.adoptionLevel]}>
                      {tech.adoptionLevel}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Maturity</span>
                      <span>{tech.maturity}%</span>
                    </div>
                    <Progress value={tech.maturity} className="h-2" />
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-2">
          <motion.div
            key={selectedTech.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${categoryColors[selectedTech.category]} text-white`}>
                    <selectedTech.icon className="w-8 h-8" />
                  </div>
                  <Badge className={adoptionColors[selectedTech.adoptionLevel]}>
                    {selectedTech.adoptionLevel}
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{selectedTech.name}</CardTitle>
                <CardDescription className="text-base">{selectedTech.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Benefits & Challenges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {selectedTech.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-orange-600">
                      <Shield className="w-4 h-4" />
                      Challenges
                    </h4>
                    <ul className="space-y-2">
                      {selectedTech.challenges.map((challenge, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Real-World Applications */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Real-World Applications
                  </h4>
                  <div className="space-y-4">
                    {selectedTech.realWorldApplications.map((app, idx) => (
                      <div key={idx} className="bg-muted/50 rounded-lg p-4">
                        <h5 className="font-semibold mb-2">{app.title}</h5>
                        <p className="text-sm text-muted-foreground mb-2">{app.description}</p>
                        <div className="bg-primary/10 rounded-md p-2">
                          <p className="text-sm font-medium text-primary">Impact: {app.impact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Implementation Timeline */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Implementation Timeline
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(selectedTech.timeline).map(([phase, date]) => (
                      <div key={phase} className="text-center">
                        <div className="bg-primary/10 rounded-lg p-3 mb-2">
                          <p className="text-sm font-semibold capitalize">{phase}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
