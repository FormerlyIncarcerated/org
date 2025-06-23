"use client"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BorderBeam } from "@/components/magicui/border-beam"
import Marquee from "@/components/magicui/marquee"
import { BlockchainReflectiveGradient, ReflectiveGradient } from "@/components/ui/reflective-gradient"
import {
  ChainEthereumIcon,
  ChainPolygonIcon,
  ChainArbitrumIcon,
  ChainAvalancheIcon
} from "web3-icons"

// Custom SVG icons for chains not available in web3-icons
const BaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="#0052FF"/>
    <path d="M12 4a8 8 0 0 1 8 8h-8V4z" fill="white"/>
  </svg>
)

const SolanaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <defs>
      <linearGradient id="solanaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#9945FF"/>
        <stop offset="100%" stopColor="#14F195"/>
      </linearGradient>
    </defs>
    <path d="M4.5 17.5L19.5 6.5c.5-.5 1.3-.5 1.8 0s.5 1.3 0 1.8L6.3 19.3c-.5.5-1.3.5-1.8 0s-.5-1.3 0-1.8z" fill="url(#solanaGradient)"/>
    <path d="M4.5 12L19.5 1c.5-.5 1.3-.5 1.8 0s.5 1.3 0 1.8L6.3 13.8c-.5.5-1.3.5-1.8 0s-.5-1.3 0-1.8z" fill="url(#solanaGradient)"/>
    <path d="M4.5 6.5L19.5 17.5c.5.5 1.3.5 1.8 0s.5-1.3 0-1.8L6.3 4.7c-.5-.5-1.3-.5-1.8 0s-.5 1.3 0 1.8z" fill="url(#solanaGradient)"/>
  </svg>
)

// Beautiful themed blockchain icon wrapper with proper animations
const BlockchainIcon = ({
  children,
  color,
  name,
  size = 48
}: {
  children: React.ReactNode
  color: string
  name: string
  size?: number
}) => (
  <motion.div
    className="relative group cursor-pointer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    {/* Reflective gradient background */}
    <ReflectiveGradient
      className="absolute inset-0 rounded-2xl"
      gradientColor="hsl(var(--secondary) / 0.2)"
      intensity={0.5}
      size={120}
    >
      <div className="w-full h-full" />
    </ReflectiveGradient>

    {/* Main icon container */}
    <div
      className={`relative rounded-2xl ${color} p-3 shadow-2xl backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-300`}
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full flex items-center justify-center text-white">
        {children}
      </div>
    </div>
  </motion.div>
)

// Beautiful blockchain data with theme-aware colors that adapt to light/dark mode
const blockchains = [
  {
    name: "Ethereum",
    symbol: "ETH",
    color: "bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600",
    glowColor: "shadow-blue-500/30 dark:shadow-blue-400/40",
    themeColor: "blue",
    description: "The world's programmable blockchain",
    pros: ["Largest DeFi ecosystem", "Smart contract pioneer", "Strong developer community"],
    cons: ["High gas fees", "Energy consumption", "Scalability challenges"],
    useCase: "DeFi, NFTs, DAOs",
    icon: <ChainEthereumIcon className="w-8 h-8" />,
    marketCap: "$400B+",
    tps: "15 TPS"
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    color: "bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-400 dark:to-purple-600",
    glowColor: "shadow-purple-500/30 dark:shadow-purple-400/40",
    themeColor: "purple",
    description: "Ethereum's Internet of Blockchains",
    pros: ["Low fees", "Fast transactions", "Ethereum compatibility"],
    cons: ["Centralization concerns", "Validator dependency", "Bridge risks"],
    useCase: "Gaming, DeFi, Enterprise",
    icon: <ChainPolygonIcon className="w-8 h-8" />,
    marketCap: "$8B+",
    tps: "7,000 TPS"
  },
  {
    name: "Arbitrum",
    symbol: "ARB",
    color: "bg-gradient-to-br from-cyan-500 to-cyan-700 dark:from-cyan-400 dark:to-cyan-600",
    glowColor: "shadow-cyan-500/30 dark:shadow-cyan-400/40",
    themeColor: "cyan",
    description: "Optimistic Rollup for Ethereum",
    pros: ["Lower fees than Ethereum", "EVM compatible", "Strong security"],
    cons: ["7-day withdrawal period", "Newer ecosystem", "Complexity"],
    useCase: "DeFi, Trading, dApps",
    icon: <ChainArbitrumIcon className="w-8 h-8" />,
    marketCap: "$2B+",
    tps: "4,000 TPS"
  },
  {
    name: "Base",
    symbol: "BASE",
    color: "bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-400 dark:to-indigo-600",
    glowColor: "shadow-indigo-500/30 dark:shadow-indigo-400/40",
    themeColor: "indigo",
    description: "Coinbase's Layer 2 solution",
    pros: ["Coinbase backing", "Easy onboarding", "Growing ecosystem"],
    cons: ["Centralized elements", "New platform", "Limited history"],
    useCase: "Consumer apps, Social, Payments",
    icon: <BaseIcon className="w-8 h-8" />,
    marketCap: "Growing",
    tps: "2,000+ TPS"
  },
  {
    name: "Solana",
    symbol: "SOL",
    color: "bg-gradient-to-br from-emerald-500 to-emerald-700 dark:from-emerald-400 dark:to-emerald-600",
    glowColor: "shadow-emerald-500/30 dark:shadow-emerald-400/40",
    themeColor: "emerald",
    description: "High-performance blockchain",
    pros: ["Ultra-fast transactions", "Low fees", "Growing ecosystem"],
    cons: ["Network outages", "Centralization", "Validator requirements"],
    useCase: "DeFi, NFTs, Web3 apps",
    icon: <SolanaIcon className="w-8 h-8" />,
    marketCap: "$50B+",
    tps: "65,000 TPS"
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    color: "bg-gradient-to-br from-red-500 to-red-700 dark:from-red-400 dark:to-red-600",
    glowColor: "shadow-red-500/30 dark:shadow-red-400/40",
    themeColor: "red",
    description: "Platform for decentralized applications",
    pros: ["Sub-second finality", "Eco-friendly", "Subnet flexibility"],
    cons: ["Complex architecture", "Validator costs", "Adoption challenges"],
    useCase: "Enterprise, DeFi, Gaming",
    icon: <ChainAvalancheIcon className="w-8 h-8" />,
    marketCap: "$15B+",
    tps: "4,500 TPS"
  }
]

// Stunning blockchain card with enhanced animations and theming
const BlockchainCard = ({ blockchain, index }: { blockchain: typeof blockchains[0]; index: number }) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      duration: 0.6,
      delay: index * 0.15,
      type: "spring",
      stiffness: 100,
      damping: 15
    }}
    whileHover={{
      y: -8,
      rotateX: 5,
      transition: { duration: 0.3 }
    }}
    className="relative group perspective-1000"
  >
    <BlockchainReflectiveGradient
      themeColor={blockchain.themeColor}
      className="h-full rounded-2xl"
    >
      <Card className={`h-full bg-gradient-to-br from-card/90 to-card/70 dark:from-card/80 dark:to-card/60 backdrop-blur-xl border border-border/50 hover:border-primary/30 dark:hover:border-secondary/30 transition-all duration-500 group-hover:shadow-2xl ${blockchain.glowColor} group-hover:shadow-lg overflow-hidden`}>
      <BorderBeam size={300} duration={15} delay={index * 3} />

      <CardHeader className="pb-4 relative">
        <div className="flex items-center gap-4 mb-3">
          <BlockchainIcon name={blockchain.name} color={blockchain.color} size={56}>
            {blockchain.icon}
          </BlockchainIcon>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {blockchain.name}
              </CardTitle>
              <Badge variant="secondary" className={`text-xs font-semibold ${blockchain.color} text-white dark:text-white border-0 shadow-sm`}>
                {blockchain.symbol}
              </Badge>
            </div>
            <div className="flex gap-3 text-xs text-muted-foreground">
              <span className="font-medium">{blockchain.marketCap}</span>
              <span>•</span>
              <span className="font-medium">{blockchain.tps}</span>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed">
          {blockchain.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="p-3 rounded-lg bg-accent/30 border border-accent/50">
          <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Primary Use Cases
          </h4>
          <p className="text-sm text-muted-foreground">{blockchain.useCase}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
              <motion.span
                className="w-2 h-2 bg-emerald-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Key Advantages
            </h4>
            <ul className="space-y-1.5">
              {blockchain.pros.slice(0, 2).map((pro, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.1 }}
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{pro}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h4 className="text-sm font-semibold text-amber-400 mb-2 flex items-center gap-2">
              <motion.span
                className="w-2 h-2 bg-amber-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              Considerations
            </h4>
            <ul className="space-y-1.5">
              {blockchain.cons.slice(0, 2).map((con, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + i * 0.1 + 0.2 }}
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="leading-relaxed">{con}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </CardContent>

      {/* Hover overlay effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={false}
      />
    </Card>
    </BlockchainReflectiveGradient>
    </motion.div>
  )
}



export default function BlockchainShowcase() {
  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Enhanced animated background with multiple layers - theme aware */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 dark:from-primary/8 dark:via-transparent dark:to-secondary/8" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent dark:via-accent/8" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent dark:via-primary/15"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>



      {/* Content */}
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-300% animate-gradient"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Multi-Chain
            </motion.span>{" "}
            <span className="text-foreground">Empowerment</span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Breaking barriers across multiple blockchain ecosystems to create maximum opportunities
            for formerly incarcerated individuals through cutting-edge Web3 technology
          </motion.p>

          {/* Enhanced Animated Marquee with better styling */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
            <Marquee className="py-6 [--duration:30s]" pauseOnHover>
              {blockchains.map((blockchain) => (
                <ReflectiveGradient
                  key={blockchain.name}
                  className="flex items-center gap-3 mx-12 group cursor-pointer rounded-xl"
                  gradientColor="hsl(var(--accent) / 0.1)"
                  intensity={0.3}
                  size={150}
                >
                  <motion.div
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BlockchainIcon name={blockchain.name} color={blockchain.color} size={40}>
                      {blockchain.icon}
                    </BlockchainIcon>
                    <div className="text-left">
                      <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {blockchain.name}
                      </span>
                      <div className="text-sm text-muted-foreground">
                        {blockchain.tps}
                      </div>
                    </div>
                  </motion.div>
                </ReflectiveGradient>
              ))}
            </Marquee>
          </motion.div>
        </motion.div>

        {/* Enhanced Blockchain Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {blockchains.map((blockchain, index) => (
            <BlockchainCard key={blockchain.name} blockchain={blockchain} index={index} />
          ))}
        </motion.div>

        {/* Enhanced Bottom CTA with better animations */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-24"
        >
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            Our platform integrates with multiple blockchains to provide the best opportunities,
            lowest fees, and maximum accessibility
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {[
              { text: "Ultra Low Fees", icon: "💰" },
              { text: "Lightning Fast", icon: "⚡" },
              { text: "Global Access", icon: "🌍" },
              { text: "Fully Decentralized", icon: "🔗" },
              { text: "Bank-Grade Security", icon: "🛡️" }
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-medium border-primary/30 dark:border-secondary/30 text-primary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 transition-all duration-300 cursor-pointer"
                >
                  <span className="mr-2">{feature.icon}</span>
                  {feature.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
