"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ExternalLink, AlertCircle, ChevronDown, Copy, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

// Placeholder component for Web3 wallet connection
// This will be implemented in Phase 3 with proper Web3 libraries

interface WalletConnectProps {
  compact?: boolean
}

export function WalletConnect({ compact = false }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

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

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress)
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
        >
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className="bg-gradient-to-r from-primary to-secondary dark:from-secondary dark:to-primary text-primary-foreground dark:text-secondary-foreground border-2 border-primary/20 dark:border-secondary/20 shadow-lg hover:shadow-xl hover:shadow-primary/25 dark:hover:shadow-secondary/25 transition-all duration-300 font-semibold"
            size="sm"
          >
            {isConnecting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Connecting...
              </>
            ) : (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </>
            )}
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
          >
            <Button
              variant="outline"
              className="border-2 border-primary/50 dark:border-secondary/50 text-primary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 hover:border-primary dark:hover:border-secondary backdrop-blur-sm bg-background/50 dark:bg-background/50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
              size="sm"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="hidden sm:inline">
                  {formatAddress(walletAddress)}
                </span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </Button>
          </motion.div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-64 border-2 border-border/50 backdrop-blur-xl bg-background/95 shadow-2xl"
        >
          <div className="p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Connected</span>
              <Badge variant="outline" className="text-xs">
                Ethereum
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm font-mono">
                {formatAddress(walletAddress)}
              </span>
            </div>

            <div className="text-lg font-bold text-foreground">
              1.234 ETH
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
            <Copy className="w-4 h-4 mr-2" />
            Copy Address
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Explorer
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleDisconnect}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  // Full card version for pages
  if (isConnected) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-green-500" />
            Wallet Connected
          </CardTitle>
          <CardDescription>
            Your Web3 wallet is connected to the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <span className="text-sm font-mono">{walletAddress}</span>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              You can now participate in governance, access token utilities, and engage with Web3 features.
            </p>
          </div>
          <Button variant="outline" onClick={handleDisconnect} className="w-full">
            Disconnect Wallet
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Your Wallet
        </CardTitle>
        <CardDescription>
          Connect your Web3 wallet to access platform features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900 dark:text-blue-100">
              Web3 Features Coming Soon
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              Wallet connection and Web3 features will be available in Phase 3 of our development roadmap.
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium">Supported Wallets:</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 border rounded-lg opacity-50">
              <div className="w-6 h-6 bg-orange-500 rounded"></div>
              <span className="text-sm">MetaMask</span>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded-lg opacity-50">
              <div className="w-6 h-6 bg-blue-500 rounded"></div>
              <span className="text-sm">WalletConnect</span>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded-lg opacity-50">
              <div className="w-6 h-6 bg-purple-500 rounded"></div>
              <span className="text-sm">Coinbase</span>
            </div>
            <div className="flex items-center gap-2 p-2 border rounded-lg opacity-50">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <span className="text-sm">Trust Wallet</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleConnect} 
          disabled={isConnecting} 
          className="w-full"
        >
          {isConnecting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet (Demo)
            </>
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground text-center">
          This is a demo interface. Actual Web3 integration coming in Q4 2025.
        </p>
      </CardContent>
    </Card>
  )
}
