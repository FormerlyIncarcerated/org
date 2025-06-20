import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Coins,
  Award,
  Users,
  Briefcase,
  Home,
  Scale,
  GraduationCap,
  Shield,
  TrendingUp,
  Heart
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProgramsPage() {
  const programs = [
    {
      icon: Coins,
      title: "Second Chance Governance Token (SCG)",
      description: "Stake tokens to vote on funding decisions for formerly incarcerated entrepreneurs",
      features: [
        "Democratic voting on grant distributions",
        "Earn voting power through community contributions",
        "Quarterly impact reports and ROI metrics",
        "Governance over program development"
      ],
      status: "Coming Soon",
      category: "Governance"
    },
    {
      icon: Award,
      title: "Skill Verification & Certification NFTs",
      description: "Mint NFTs for completed vocational training, certifications, and skill assessments",
      features: [
        "Tradeable certificates as verifiable credentials",
        "Smart contracts unlock higher-tier opportunities",
        "Partner verification without background discrimination",
        "Blockchain-verified skill accumulation"
      ],
      status: "In Development",
      category: "Education"
    },
    {
      icon: Users,
      title: "Micro-Investment DAO Platform",
      description: "Pool tokens to collectively invest in formerly incarcerated-owned businesses",
      features: [
        "Automated profit sharing through smart contracts",
        "Risk assessment based on business viability",
        "Democratic voting on investment decisions",
        "Built-in due diligence protocols"
      ],
      status: "Planning",
      category: "Investment"
    },
    {
      icon: Briefcase,
      title: "Decentralized Job Marketplace",
      description: "Employers stake tokens to post 'second chance' job opportunities",
      features: [
        "Anonymous initial screening based on skills",
        "Workers earn tokens for completing gigs",
        "Reputation scores build over time",
        "Automated escrow payments with dispute resolution"
      ],
      status: "Research",
      category: "Employment"
    },
    {
      icon: Home,
      title: "Reentry Resource Access Token",
      description: "Exchange tokens for housing assistance, legal aid, mental health services",
      features: [
        "Partnership network with service providers",
        "Sliding scale costs based on income and time since release",
        "Incentivize providers with bonus tokens for outcomes",
        "Comprehensive support ecosystem"
      ],
      status: "Planning",
      category: "Support Services"
    },
    {
      icon: TrendingUp,
      title: "Startup Incubator Token Economy",
      description: "Formerly incarcerated individuals pitch business ideas to token-holding community",
      features: [
        "Token grants with milestone-based releases",
        "Mentors earn tokens for guidance and success metrics",
        "Revenue sharing agreements in smart contracts",
        "Comprehensive business development support"
      ],
      status: "Concept",
      category: "Entrepreneurship"
    },
    {
      icon: Scale,
      title: "Peer-to-Peer Lending Protocol",
      description: "Community members lend tokens to entrepreneurs at fair interest rates",
      features: [
        "Credit scoring based on community reputation",
        "Collateral-free loans backed by community validation",
        "Default insurance pool funded by platform fees",
        "Mentorship-backed lending decisions"
      ],
      status: "Research",
      category: "Financial Services"
    },
    {
      icon: Shield,
      title: "Legal Aid & Advocacy Fund",
      description: "Community pools tokens to fund legal representation and advocacy efforts",
      features: [
        "Automated triggers for emergency legal assistance",
        "Partnership with legal aid organizations",
        "Expungement and record sealing services",
        "Community-driven advocacy initiatives"
      ],
      status: "Planning",
      category: "Legal Support"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Development":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Research":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Coming Soon":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const categories = [...new Set(programs.map(p => p.category))]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-12 md:py-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Web3 Empowerment Programs
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Innovative blockchain-based solutions designed to break barriers and create opportunities 
          for formerly incarcerated individuals to rebuild their lives and thrive.
        </p>
      </div>

      {/* Programs Grid */}
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Card key={program.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <program.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge className={getStatusColor(program.status)}>
                    {program.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Key Features:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <Badge variant="outline">{program.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Implementation Timeline */}
      <div className="mx-auto mt-24 max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Implementation Roadmap</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our phased approach to building a comprehensive Web3 empowerment ecosystem.
          </p>
        </div>
        
        <div className="mt-12 space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold">Foundation Building (Q2-Q3 2025)</h3>
              <p className="text-muted-foreground">
                Launch governance token, establish community guidelines, and partner with existing reentry organizations.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold">Core Services (Q4 2025-Q1 2026)</h3>
              <p className="text-muted-foreground">
                Deploy job marketplace, skill verification, and basic lending protocols with initial service providers.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-semibold">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold">Advanced Features (Q2-Q3 2026)</h3>
              <p className="text-muted-foreground">
                Launch investment DAOs, real estate tokenization, and insurance cooperatives with traditional system integration.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground text-sm font-semibold">
              4
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ecosystem Expansion (Q4 2026+)</h3>
              <p className="text-muted-foreground">
                Cross-chain compatibility, international expansion, and advanced AI/ML features for matching and impact measurement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mx-auto mt-24 max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to Get Involved?</h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Join our community and help shape the future of reentry support through Web3 innovation.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="/survey"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Take Our Survey
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            Contact Us
          </a>
        </div>
      </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
