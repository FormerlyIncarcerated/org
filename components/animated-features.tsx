"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BorderBeam } from "@/components/magicui/border-beam"
import { 
  Coins, 
  Users, 
  Shield, 
  Zap, 
  Globe, 
  TrendingUp,
  Heart,
  Briefcase,
  GraduationCap,
  Building
} from "lucide-react"

const features = [
  {
    icon: Coins,
    title: "Decentralized Finance",
    description: "Access to DeFi protocols for lending, borrowing, and earning without traditional banking barriers",
    gradient: "from-yellow-400 to-orange-500",
    delay: 0.1
  },
  {
    icon: Briefcase,
    title: "Anonymous Job Marketplace",
    description: "Skills-based hiring platform where talent matters more than background checks",
    gradient: "from-blue-400 to-cyan-500",
    delay: 0.2
  },
  {
    icon: GraduationCap,
    title: "Skill Verification NFTs",
    description: "Blockchain-verified credentials and certifications that prove your capabilities",
    gradient: "from-purple-400 to-pink-500",
    delay: 0.3
  },
  {
    icon: Users,
    title: "Community DAO",
    description: "Participate in governance and decision-making for platform development",
    gradient: "from-green-400 to-emerald-500",
    delay: 0.4
  },
  {
    icon: TrendingUp,
    title: "Micro-Investment Platform",
    description: "Start small businesses with community-funded micro-investments and support",
    gradient: "from-red-400 to-rose-500",
    delay: 0.5
  },
  {
    icon: Shield,
    title: "Privacy Protection",
    description: "Blockchain technology ensures your data privacy and identity protection",
    gradient: "from-indigo-400 to-blue-500",
    delay: 0.6
  },
  {
    icon: Heart,
    title: "Peer Support Network",
    description: "Connect with mentors and peers who understand your journey",
    gradient: "from-pink-400 to-red-500",
    delay: 0.7
  },
  {
    icon: Building,
    title: "Real Estate Syndication",
    description: "Participate in property investments through tokenized real estate opportunities",
    gradient: "from-teal-400 to-cyan-500",
    delay: 0.8
  }
]

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.6, 
        delay: feature.delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      <Card className="h-full bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-border/50 hover:border-color-2/50 transition-all duration-500 overflow-hidden">
        <BorderBeam size={250} duration={10} delay={index * 1.5} />
        
        <CardContent className="p-6 relative">
          {/* Background gradient effect */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
          />
          
          {/* Icon with animated background */}
          <motion.div
            className="relative mb-4"
            whileHover={{ rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            
            {/* Animated glow effect */}
            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <h3 className="text-xl font-bold mb-3 text-color-2 group-hover:text-color-4 transition-colors duration-300">
            {feature.title}
          </h3>
          
          <p className="text-muted-foreground leading-relaxed">
            {feature.description}
          </p>

          {/* Animated bottom accent */}
          <motion.div
            className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-500`}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i * 8)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <div className={`w-4 h-4 bg-gradient-to-br from-color-${(i % 4) + 1} to-color-${((i + 1) % 4) + 1} rounded-full opacity-20`} />
        </motion.div>
      ))}
    </div>
  )
}

export default function AnimatedFeatures() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background" />
        
        {/* Animated mesh gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `
              conic-gradient(from 0deg at 50% 50%, 
                var(--color-1) 0deg, 
                var(--color-2) 90deg, 
                var(--color-3) 180deg, 
                var(--color-4) 270deg, 
                var(--color-1) 360deg
              )
            `,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        <FloatingElements />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-color-2/20 to-color-4/20 border border-color-2/30 mb-6"
          >
            <Zap className="w-4 h-4 text-color-2" />
            <span className="text-sm font-medium text-color-2">Powered by Web3 Technology</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-color-2 via-color-4 to-color-2 bg-clip-text text-transparent">
              Revolutionary Features
            </span>
            <br />
            <span className="text-foreground">for Real Impact because the web 3 ecosystem is always in motion</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Here is how we can leverage digital assets for real-world impact:
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border border-border/50 max-w-4xl mx-auto">
            <BorderBeam size={400} duration={15} />
            
            <Globe className="w-12 h-12 text-color-2 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-color-2 to-color-4 bg-clip-text text-transparent">
                Join the Movement
              </span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Be part of a revolutionary platform that's changing lives through technology, 
              community support, and innovative financial solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {["Decentralized", "Community-Driven", "Privacy-First", "Inclusive", "Innovative"].map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-color-2/20 to-color-4/20 border border-color-2/30 text-sm text-color-2"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
