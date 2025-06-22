"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, GraduationCap, Heart, Shield, Coins, Building, ArrowRight } from "lucide-react"

const proposals = [
  {
    id: 1,
    title: "Job Matching Platform",
    description: "Connect formerly incarcerated individuals with employers through blockchain-verified hiring.",
    icon: Briefcase,
    status: "Active"
  },
  {
    id: 2,
    title: "Skills Certification System",
    description: "Issue blockchain certificates for completed training programs and skills development.",
    icon: GraduationCap,
    status: "In Review"
  },
  {
    id: 3,
    title: "Community Support Network",
    description: "Token-based rewards for mentorship and community support activities.",
    icon: Heart,
    status: "Draft"
  },
  {
    id: 4,
    title: "Privacy Identity System",
    description: "Secure identity verification without exposing criminal history details.",
    icon: Shield,
    status: "Active"
  },
  {
    id: 5,
    title: "Micro-Investment Platform",
    description: "Crowdfunding for small business ventures and entrepreneurial projects.",
    icon: Coins,
    status: "Active"
  },
  {
    id: 6,
    title: "Housing Assistance DAO",
    description: "Decentralized organization for housing support and advocacy.",
    icon: Building,
    status: "In Review"
  }
]

const statusColors = {
  "Active": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  "In Review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  "Draft": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
}

export default function ProposalsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Platform Proposals
          </h1>
          <p className="text-lg text-muted-foreground">
            Community-driven ideas to enhance our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proposals.map((proposal) => {
            const IconComponent = proposal.icon

            return (
              <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{proposal.title}</CardTitle>
                      </div>
                    </div>
                    <Badge className={statusColors[proposal.status as keyof typeof statusColors]}>
                      {proposal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {proposal.description}
                  </CardDescription>
                  <Button variant="outline" className="w-full">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Card className="max-w-lg mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                Have an Idea?
              </h3>
              <p className="text-muted-foreground mb-4">
                Submit your own proposal to help improve the platform.
              </p>
              <Button>
                Submit Proposal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
