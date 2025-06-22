"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Vote, 
  Users, 
  Coins, 
  Shield, 
  TrendingUp, 
  Heart, 
  CheckCircle, 
  ArrowRight,
  Gavel,
  PieChart,
  Target,
  Handshake,
  Globe,
  Lock,
  Zap,
  Award
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GovernanceUseCase {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  category: "community" | "financial" | "policy" | "development"
  impact: "high" | "medium" | "low"
  timeline: string
  stakeholders: string[]
  benefits: string[]
  example: {
    scenario: string
    process: string[]
    outcome: string
  }
}

const governanceUseCases: GovernanceUseCase[] = [
  {
    id: "community-funding",
    title: "Community Program Funding",
    description: "Democratic allocation of resources for reentry programs and community initiatives",
    icon: Coins,
    category: "financial",
    impact: "high",
    timeline: "Q4 2025",
    stakeholders: ["Formerly Incarcerated", "Community Leaders", "Service Providers", "Donors"],
    benefits: [
      "Transparent fund allocation",
      "Community-driven priorities",
      "Reduced bureaucracy",
      "Measurable impact tracking"
    ],
    example: {
      scenario: "A community needs $50,000 for a job training program",
      process: [
        "Community members propose the program",
        "Stakeholders review and discuss the proposal",
        "Token holders vote on funding allocation",
        "Smart contracts automatically release funds upon milestones"
      ],
      outcome: "Program funded with 78% approval, serving 150 individuals"
    }
  },
  {
    id: "policy-development",
    title: "Platform Policy Creation",
    description: "Collaborative development of platform rules and community guidelines",
    icon: Gavel,
    category: "policy",
    impact: "high",
    timeline: "Q3 2025",
    stakeholders: ["All Community Members", "Platform Team", "Legal Advisors"],
    benefits: [
      "Inclusive policy making",
      "Community ownership",
      "Transparent governance",
      "Adaptive regulations"
    ],
    example: {
      scenario: "Creating fair dispute resolution procedures",
      process: [
        "Working groups draft initial policies",
        "Community feedback and iteration",
        "Formal voting on final proposals",
        "Implementation with review periods"
      ],
      outcome: "Fair, community-approved policies with 85% satisfaction rate"
    }
  },
  {
    id: "resource-allocation",
    title: "Resource Prioritization",
    description: "Community-driven decisions on platform development and resource allocation",
    icon: PieChart,
    category: "development",
    impact: "medium",
    timeline: "Q1 2026",
    stakeholders: ["Platform Users", "Developers", "Community Leaders"],
    benefits: [
      "User-driven development",
      "Efficient resource use",
      "Community alignment",
      "Transparent roadmap"
    ],
    example: {
      scenario: "Choosing between mobile app or advanced analytics features",
      process: [
        "Community surveys and discussions",
        "Technical feasibility assessment",
        "Weighted voting by user engagement",
        "Development team implementation"
      ],
      outcome: "Mobile app prioritized with 65% vote, increasing accessibility"
    }
  },
  {
    id: "partnership-approval",
    title: "Strategic Partnership Decisions",
    description: "Community approval for major partnerships and integrations",
    icon: Handshake,
    category: "community",
    impact: "high",
    timeline: "Q2 2026",
    stakeholders: ["Community Members", "Potential Partners", "Platform Leadership"],
    benefits: [
      "Community-vetted partnerships",
      "Aligned organizational values",
      "Transparent decision making",
      "Shared ownership of direction"
    ],
    example: {
      scenario: "Partnership with major employer for job placement program",
      process: [
        "Partnership proposal presentation",
        "Community Q&A sessions",
        "Due diligence review",
        "Community vote on partnership terms"
      ],
      outcome: "Partnership approved with enhanced job placement guarantees"
    }
  }
]

const categoryColors = {
  community: "from-blue-500 to-cyan-500",
  financial: "from-green-500 to-emerald-500",
  policy: "from-purple-500 to-violet-500",
  development: "from-orange-500 to-red-500"
}

const categoryIcons = {
  community: Users,
  financial: TrendingUp,
  policy: Shield,
  development: Zap
}

export default function GovernanceShowcase() {
  const [selectedUseCase, setSelectedUseCase] = useState<GovernanceUseCase | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const filteredUseCases = activeCategory === "all" 
    ? governanceUseCases 
    : governanceUseCases.filter(useCase => useCase.category === activeCategory)

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
            <Vote className="w-4 h-4 mr-2" />
            Governance Innovation
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Community-Driven Decision Making
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Empowering formerly incarcerated individuals and their communities to shape their own future 
            through transparent, democratic governance powered by Web3 technology.
          </p>
        </motion.div>
      </div>

      {/* Category Filter */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
        <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            All
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Community
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="policy" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Policy
          </TabsTrigger>
          <TabsTrigger value="development" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Development
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Use Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {filteredUseCases.map((useCase, index) => {
          const CategoryIcon = categoryIcons[useCase.category]
          return (
            <motion.div
              key={useCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 border-2 hover:border-primary/30"
                onClick={() => setSelectedUseCase(useCase)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${categoryColors[useCase.category]} text-white`}>
                      <useCase.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={useCase.impact === "high" ? "default" : "secondary"}>
                        {useCase.impact} impact
                      </Badge>
                      <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Key Benefits:</h4>
                      <ul className="space-y-1">
                        {useCase.benefits.slice(0, 3).map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">{useCase.timeline}</span>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Detailed Use Case Modal */}
      <AnimatePresence>
        {selectedUseCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedUseCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${categoryColors[selectedUseCase.category]} text-white`}>
                  <selectedUseCase.icon className="w-6 h-6" />
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedUseCase(null)}>
                  ✕
                </Button>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{selectedUseCase.title}</h3>
              <p className="text-muted-foreground mb-6">{selectedUseCase.description}</p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Stakeholders
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUseCase.stakeholders.map((stakeholder, idx) => (
                      <Badge key={idx} variant="outline">{stakeholder}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Example Scenario
                  </h4>
                  <div className="bg-muted/50 rounded-lg p-4 space-y-4">
                    <p className="font-medium">{selectedUseCase.example.scenario}</p>
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Process:</h5>
                      <ol className="space-y-2">
                        {selectedUseCase.example.process.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mt-0.5">
                              {idx + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                      <h5 className="font-semibold text-sm mb-1 text-green-800 dark:text-green-200">Outcome:</h5>
                      <p className="text-sm text-green-700 dark:text-green-300">{selectedUseCase.example.outcome}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
