"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ExternalLink, AlertCircle, ChevronDown, Copy, LogOut, Shield, Zap, CheckCircle2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

// Placeholder component for Web3 wallet connection
// This will be implemented in Phase 3 with proper Web3 libraries

interface WalletConnectProps {
  compact?: boolean
}

export function WalletConnect({ compact = false }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [showCopied, setShowCopied] = useState(false)
  const { theme } = useTheme()

  const handleConnect = async () => {
    setIsConnecting(true)
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock connection success
    setIsConnected(true)
    setWalletAddress("0x1234...5678")
    setIsConnecting(false)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  const copyAddress = async () => {
    if (walletAddress) {
      try {
        await navigator.clipboard.writeText("0x1234567890123456789012345678901234567890")
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy address:', err)
      }
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  // Compact version for header
  if (compact) {
    if (!isConnected) {
      return (
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="relative overflow-hidden bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/90 hover:to-secondary/90 text-primary-foreground border-2 border-primary/30 shadow-theme hover:shadow-theme-lg hover:shadow-primary/30 transition-all duration-300 font-semibold backdrop-blur-sm"
            size="sm"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-pulse opacity-50" />

            <div className="relative flex items-center">
              {isConnecting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  <span className="text-sm">Connecting...</span>
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Connect</span>
                </>
              )}
            </div>
          </Button>
        </motion.div>
      )
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <Button
              variant="outline"
              className="relative border-2 border-primary/40 hover:border-primary/60 text-primary hover:text-primary bg-card/80 hover:bg-card/90 backdrop-blur-md shadow-theme hover:shadow-theme-lg transition-all duration-300 font-medium"
              size="sm"
            >
              {/* Success indicator glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg blur opacity-60" />

              <div className="relative flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-500/50" />
                  <CheckCircle2 className="w-3 h-3 text-green-500" />
                </div>
                <span className="hidden sm:inline text-sm font-mono">
                  {formatAddress(walletAddress)}
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </div>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-72 border-2 border-primary/20 backdrop-blur-xl bg-card/95 shadow-theme-lg"
        >
          {/* Header Section */}
          <div className="p-4 space-y-3 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm shadow-green-500/50" />
                <span className="text-sm font-semibold text-foreground">Connected</span>
              </div>
              <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                <Zap className="w-3 h-3 mr-1" />
                Ethereum
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-muted-foreground">
                  {formatAddress(walletAddress)}
                </span>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3">
                <div className="text-2xl font-bold text-foreground">1.234 ETH</div>
                <div className="text-sm text-muted-foreground">≈ $2,468.00 USD</div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="p-2">
            <DropdownMenuItem onClick={copyAddress} className="cursor-pointer hover:bg-primary/10 rounded-lg">
              <div className="flex items-center w-full">
                <Copy className="w-4 h-4 mr-3 text-primary" />
                <span className="flex-1">Copy Address</span>
                <AnimatePresence>
                  {showCopied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-xs text-green-600 font-medium"
                    >
                      Copied!
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 rounded-lg">
              <ExternalLink className="w-4 h-4 mr-3 text-primary" />
              View on Explorer
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem
              onClick={handleDisconnect}
              className="cursor-pointer text-destructive hover:text-destructive hover:bg-destructive/10 rounded-lg"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Disconnect Wallet
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Full card version for pages
  if (isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md border-2 border-primary/20 shadow-theme-lg bg-card/90 backdrop-blur-sm">
          {/* Success glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-xl blur opacity-60" />

          <div className="relative">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/30"
              >
                <CheckCircle2 className="h-8 w-8 text-white" />
              </motion.div>

              <CardTitle className="flex items-center justify-center gap-2 text-xl">
                <span className="text-gradient-readable">Wallet Connected</span>
              </CardTitle>
              <CardDescription className="text-base">
                Your Web3 wallet is securely connected to the platform
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Wallet Info */}
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Address</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                      <Zap className="w-3 h-3 mr-1" />
                      Ethereum
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground">{walletAddress}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyAddress}
                      className="hover:bg-primary/10"
                    >
                      {showCopied ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">1.234 ETH</div>
                    <div className="text-sm text-muted-foreground">≈ $2,468.00 USD</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-foreground">Available Features:</h4>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { icon: Vote, text: "Participate in governance" },
                    { icon: Coins, text: "Access token utilities" },
                    { icon: Shield, text: "Secure identity management" },
                    { icon: Zap, text: "Web3 platform features" }
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <feature.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{feature.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-primary/30 hover:bg-primary/10 hover:border-primary/50"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Explorer
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDisconnect}
                  className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive/50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Disconnect Wallet
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md border-2 border-primary/20 shadow-theme-lg bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4 shadow-lg shadow-primary/30"
          >
            <Wallet className="h-8 w-8 text-primary-foreground" />
          </motion.div>

          <CardTitle className="flex items-center justify-center gap-2 text-xl">
            <span className="text-gradient-readable">Connect Your Wallet</span>
          </CardTitle>
          <CardDescription className="text-base">
            Connect your Web3 wallet to unlock platform features and participate in the community
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Coming Soon Notice */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative overflow-hidden rounded-xl border-2 border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-4"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse" />
            <div className="relative flex items-start gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-primary mb-1">
                  Web3 Features Coming Soon
                </p>
                <p className="text-sm text-muted-foreground">
                  Wallet connection and Web3 features will be available in Phase 3 of our development roadmap (Q4 2025).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Supported Wallets */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Supported Wallets
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "MetaMask", color: "bg-orange-500", icon: "🦊" },
                { name: "WalletConnect", color: "bg-blue-500", icon: "🔗" },
                { name: "Coinbase", color: "bg-blue-600", icon: "💙" },
                { name: "Trust Wallet", color: "bg-blue-400", icon: "🛡️" }
              ].map((wallet, idx) => (
                <motion.div
                  key={wallet.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-3 p-3 border-2 border-border/50 rounded-lg hover:border-primary/30 transition-all duration-300 opacity-60 hover:opacity-80"
                >
                  <div className={`w-8 h-8 ${wallet.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                    {wallet.icon}
                  </div>
                  <span className="text-sm font-medium">{wallet.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Connect Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full relative overflow-hidden bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/90 hover:to-secondary/90 text-primary-foreground border-2 border-primary/30 shadow-theme hover:shadow-theme-lg transition-all duration-300 font-semibold h-12"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 animate-pulse opacity-50" />

              <div className="relative flex items-center justify-center">
                {isConnecting ? (
                  <>
                    <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    <span>Connecting Wallet...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="mr-3 h-5 w-5" />
                    <span>Connect Wallet (Demo)</span>
                  </>
                )}
              </div>
            </Button>
          </motion.div>

          {/* Demo Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-2">
              🚀 This is a demo interface showcasing future Web3 integration capabilities
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
