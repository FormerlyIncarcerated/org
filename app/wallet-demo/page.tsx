"use client"

import { motion } from "framer-motion"
import { WalletConnect } from "@/components/wallet-connect"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Zap, Shield, Code } from "lucide-react"

export default function WalletDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border-primary/20">
            <Code className="w-4 h-4 mr-2" />
            Component Demo
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Wallet Connect Component Showcase
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the enhanced wallet connection interface designed for the FormerlyIncarcerated.org platform.
            This component demonstrates our commitment to accessible, beautiful, and functional Web3 integration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Full Card Demo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <Card className="border-2 border-primary/20 bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Full Card Component
                </CardTitle>
                <CardDescription>
                  Complete wallet connection interface for dedicated pages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <WalletConnect />
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card className="border-2 border-primary/20 bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Enhanced Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      icon: Shield,
                      title: "Theme-Aware Design",
                      description: "Adapts seamlessly to all 6 supported themes with proper contrast and accessibility"
                    },
                    {
                      icon: Zap,
                      title: "Smooth Animations",
                      description: "Framer Motion powered transitions and micro-interactions for delightful UX"
                    },
                    {
                      icon: Wallet,
                      title: "Multiple States",
                      description: "Handles connecting, connected, and error states with appropriate visual feedback"
                    }
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <feature.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Compact Demo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <Card className="border-2 border-primary/20 bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Compact Header Component
                </CardTitle>
                <CardDescription>
                  Streamlined version for navigation headers and toolbars
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Disconnected State</h4>
                    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                      <WalletConnect compact />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Connected State (Simulated)</h4>
                    <div className="flex justify-center p-4 bg-muted/30 rounded-lg">
                      <div className="text-sm text-muted-foreground">
                        Click "Connect" above to see the connected state
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technical Details */}
            <Card className="border-2 border-primary/20 bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Technical Implementation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="font-semibold mb-2">Styling Enhancements</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Theme-aware color variables</li>
                      <li>• Gradient backgrounds with proper contrast</li>
                      <li>• Shadow and glow effects</li>
                      <li>• Backdrop blur for modern glass effect</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="font-semibold mb-2">Interactive Features</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Hover and tap animations</li>
                      <li>• Loading states with spinners</li>
                      <li>• Copy address with feedback</li>
                      <li>• Dropdown menu with enhanced styling</li>
                    </ul>
                  </div>
                  
                  <div className="bg-muted/50 rounded-lg p-3">
                    <h4 className="font-semibold mb-2">Accessibility</h4>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Keyboard navigation support</li>
                      <li>• Screen reader friendly</li>
                      <li>• High contrast mode compatibility</li>
                      <li>• Focus management</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Usage Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <Card className="border-2 border-primary/20 bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Usage Examples</CardTitle>
              <CardDescription>
                How to implement the WalletConnect component in your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Header Integration</h4>
                  <code className="text-xs bg-background/50 p-2 rounded block">
                    {`<WalletConnect compact />`}
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Use the compact prop for navigation headers
                  </p>
                </div>
                
                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Full Page</h4>
                  <code className="text-xs bg-background/50 p-2 rounded block">
                    {`<WalletConnect />`}
                  </code>
                  <p className="text-xs text-muted-foreground mt-2">
                    Default full card for dedicated pages
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
