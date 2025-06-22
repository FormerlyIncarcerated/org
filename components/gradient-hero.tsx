"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { BorderBeam } from "@/components/magicui/border-beam"
import { ArrowRight, Sparkles, Zap, Shield, Plus } from "lucide-react"



const AnimatedStats = () => {
  const stats = [
    { number: "70M+", label: "Americans with Records", icon: Shield, color: "from-blue-500 to-cyan-400" },
    { number: "27%", label: "Unemployment Rate", icon: Zap, color: "from-orange-500 to-red-400" },
    { number: "68%", label: "Recidivism Rate", icon: Sparkles, color: "from-purple-500 to-pink-400" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8 + index * 0.2,
            type: "spring",
            stiffness: 100
          }}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            transition: { duration: 0.3 }
          }}
          className="relative group perspective-1000"
        >
          {/* Glowing background effect */}
          <motion.div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${stat.color} opacity-20 blur-xl`}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.5,
            }}
          />

          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-background/90 to-background/60 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden">
            <BorderBeam size={300} duration={6} delay={index * 1.5} />



            <div className="relative z-10">
              {/* Icon with animated glow */}
              <motion.div
                className="mb-6"
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.color} p-4 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                  <motion.div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-50 blur-md`}
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>

              {/* Animated number */}
              <motion.div
                className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 + index * 0.3 }}
              >
                {stat.number}
              </motion.div>

              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>


          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

const GradientText = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <span className={`text-gradient-readable ${className}`}>
    {children}
  </span>
)

export default function GradientHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background" />
        
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/10 dark:from-secondary/25 dark:via-accent/20 dark:to-primary/15"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        

      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 dark:from-secondary/20 dark:to-primary/20 border-2 border-primary/30 dark:border-secondary/30 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-primary/50 dark:hover:border-secondary/50 transition-all duration-300 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary dark:text-secondary drop-shadow-sm" />
            <span className="text-sm font-bold text-primary dark:text-secondary drop-shadow-sm">Breaking Barriers with Web3</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 drop-shadow-lg"
          >
            <span className="block text-foreground drop-shadow-md">Empowering</span>
            <GradientText>Second Chances</GradientText>
            <span className="block text-foreground drop-shadow-md">Through Web3</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed font-medium drop-shadow-sm"
          >
            Breaking down systemic barriers and creating unprecedented opportunities for
            <GradientText className="font-bold drop-shadow-md"> formerly incarcerated individuals </GradientText>
            through innovative blockchain technology and community-driven support systems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <ShimmerButton className="bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary text-primary-foreground dark:text-secondary-foreground px-8 py-4 text-lg font-bold border-2 border-primary/20 dark:border-secondary/20 shadow-2xl hover:shadow-primary/25 dark:hover:shadow-secondary/25 transition-all duration-300" asChild>
              <Link href="/survey">
                <span className="flex items-center gap-2 drop-shadow-sm">
                  Take The Survey
                  <Plus className="w-5 h-5" />
                </span>
              </Link>
            </ShimmerButton>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary/50 dark:border-secondary/50 text-primary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 hover:border-primary dark:hover:border-secondary px-8 py-4 text-lg font-semibold backdrop-blur-sm bg-background/50 dark:bg-background/50 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/proposals">
                View Proposals
              </Link>
            </Button>
          </motion.div>

          {/* Animated Stats */}
          <AnimatedStats />
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
