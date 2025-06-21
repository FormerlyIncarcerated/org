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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 dark:to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-secondary/10 border border-primary/20 dark:border-secondary/20 mb-6">
            <Lightbulb className="w-4 h-4 text-primary dark:text-secondary" />
            <span className="text-sm font-medium text-primary dark:text-secondary">Platform Proposals</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary dark:from-secondary dark:via-primary dark:to-secondary bg-clip-text text-transparent">
            Community Proposals
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore innovative proposals from our community to enhance the platform and create new opportunities for formerly incarcerated individuals.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button className="bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary text-primary-foreground dark:text-secondary-foreground border-2 border-primary/20 dark:border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
              <Zap className="w-4 h-4 mr-2" />
              Submit Proposal
            </Button>
            <Button variant="outline" className="border-2 border-primary/50 dark:border-secondary/50 text-primary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 transition-all duration-300 font-semibold">
              <Globe className="w-4 h-4 mr-2" />
              View All Categories
            </Button>
          </div>
        </motion.div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((proposal, index) => {
            const IconComponent = proposal.icon
            const CategoryIcon = categoryIcons[proposal.category as keyof typeof categoryIcons]
            
            return (
              <motion.div
                key={proposal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-border/50 hover:border-primary/50 dark:hover:border-secondary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-secondary/10 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10 dark:bg-secondary/10">
                          <IconComponent className="w-5 h-5 text-primary dark:text-secondary" />
                        </div>
                        <Badge className={statusColors[proposal.status as keyof typeof statusColors]}>
                          {proposal.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <CategoryIcon className="w-4 h-4" />
                        <span>{proposal.category}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg font-bold text-foreground line-clamp-2">
                      {proposal.title}
                    </CardTitle>
                    
                    <CardDescription className="text-muted-foreground line-clamp-3">
                      {proposal.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {proposal.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{proposal.votes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{proposal.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(proposal.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Author */}
                      <div className="text-sm text-muted-foreground">
                        by <span className="font-medium text-foreground">{proposal.author}</span>
                      </div>

                      {/* Action Button */}
                      <Button className="w-full bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-secondary/10 dark:to-primary/10 text-primary dark:text-secondary border border-primary/20 dark:border-secondary/20 hover:bg-primary/20 dark:hover:bg-secondary/20 transition-all duration-300">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 dark:border-secondary/20 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-secondary/5 dark:to-primary/5">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Have an Idea?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join our community and help shape the future of the platform. Submit your own proposal and make a difference.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary text-primary-foreground dark:text-secondary-foreground border-2 border-primary/20 dark:border-secondary/20 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
                <Lightbulb className="w-5 h-5 mr-2" />
                Submit Your Proposal
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
