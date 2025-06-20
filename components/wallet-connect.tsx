"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, ExternalLink, AlertCircle } from "lucide-react"

// Placeholder component for Web3 wallet connection
// This will be implemented in Phase 3 with proper Web3 libraries

export function WalletConnect() {
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
