"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Briefcase, GraduationCap, Heart, Shield, Coins, Building, ArrowRight } from "lucide-react"

const proposals = [
  {
    id: 1,
    title: "Decentralized Job Matching Platform",
    description: "A blockchain-based platform that connects formerly incarcerated individuals with employers who value second chances, using smart contracts for fair hiring practices.",
    category: "Employment",
    status: "Active",
    votes: 127,
    comments: 23,
    author: "Community Member",
    date: "2024-01-15",
    icon: Briefcase,
    tags: ["Blockchain", "Employment", "Smart Contracts"],
    details: "This proposal aims to create a transparent hiring system where employers can post jobs specifically for individuals with criminal records, while maintaining privacy through zero-knowledge proofs."
  },
  {
    id: 2,
    title: "Educational NFT Certification System",
    description: "Issue verifiable educational certificates as NFTs for skills training programs, creating a permanent, tamper-proof record of achievements.",
    category: "Education",
    status: "Under Review",
    votes: 89,
    comments: 15,
    author: "Education Committee",
    date: "2024-01-10",
    icon: GraduationCap,
    tags: ["NFTs", "Education", "Certification"],
    details: "A system that allows educational institutions to issue blockchain-verified certificates, helping individuals build credible skill portfolios."
  },
  {
    id: 3,
    title: "Community Support Token Economy",
    description: "Create a token-based reward system for community members who provide mentorship, support, and resources to those reentering society.",
    category: "Community",
    status: "Draft",
    votes: 156,
    comments: 31,
    author: "Token Economics Team",
    date: "2024-01-08",
    icon: Heart,
    tags: ["Tokens", "Community", "Incentives"],
    details: "A comprehensive token economy that rewards positive community actions and creates sustainable support networks."
  },
  {
    id: 4,
    title: "Secure Identity Verification System",
    description: "Develop a privacy-preserving identity system that allows individuals to prove their rehabilitation without exposing sensitive criminal history.",
    category: "Identity",
    status: "Active",
    votes: 203,
    comments: 42,
    author: "Privacy Advocates",
    date: "2024-01-05",
    icon: Shield,
    tags: ["Privacy", "Identity", "Zero-Knowledge"],
    details: "Using advanced cryptography to create identity solutions that protect privacy while enabling trust and verification."
  },
  {
    id: 5,
    title: "Micro-Investment Crowdfunding Platform",
    description: "Enable community members to crowdfund small business ventures and entrepreneurial projects for formerly incarcerated individuals.",
    category: "Finance",
    status: "Active",
    votes: 94,
    comments: 18,
    author: "Finance Working Group",
    date: "2024-01-03",
    icon: Coins,
    tags: ["DeFi", "Crowdfunding", "Entrepreneurship"],
    details: "A decentralized platform for raising capital for small businesses and entrepreneurial ventures, with built-in accountability mechanisms."
  },
  {
    id: 6,
    title: "Housing Assistance DAO",
    description: "Create a decentralized autonomous organization focused on providing housing assistance and advocacy for individuals facing housing discrimination.",
    category: "Housing",
    status: "Under Review",
    votes: 178,
    comments: 27,
    author: "Housing Rights Coalition",
    date: "2023-12-28",
    icon: Building,
    tags: ["DAO", "Housing", "Advocacy"],
    details: "A community-governed organization that pools resources and advocates for fair housing practices and assistance programs."
  }
]

const statusColors = {
  "Active": "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  "Under Review": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  "Draft": "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
}

const categoryIcons = {
  "Employment": Briefcase,
  "Education": GraduationCap,
  "Community": Heart,
  "Identity": Shield,
  "Finance": Coins,
  "Housing": Building
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
