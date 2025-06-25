import { Metadata } from "next"
import { Users, Target, Heart, Zap, Shield, Globe, TrendingUp, Award } from "lucide-react"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "About Us - Breaking Barriers, Building Futures",
  description: "Learn about our mission to empower formerly incarcerated individuals through Web3 technology. Discover our values, approach, and the systemic challenges we're addressing through blockchain innovation and community support.",
  keywords: [
    "about formerly incarcerated",
    "reentry mission",
    "Web3 social impact",
    "criminal justice reform",
    "second chances organization",
    "blockchain empowerment",
    "community values",
    "social justice mission"
  ],
  openGraph: {
    title: "About FormerlyIncarcerated.org - Our Mission & Values",
    description: "Learn about our mission to empower formerly incarcerated individuals through Web3 technology and community-driven support systems.",
    url: "https://formerlyincarcerated.org/about",
    type: "website",
  },
  twitter: {
    title: "About FormerlyIncarcerated.org - Our Mission & Values",
    description: "Learn about our mission to empower formerly incarcerated individuals through Web3 technology and community-driven support systems.",
  },
}

export default function AboutPage() {
  const stats = [
    { label: "Americans with Criminal Records", value: "70M+", icon: Users },
    { label: "Unemployment Rate", value: "27%", icon: Target },
    { label: "Recidivism Rate", value: "68%", icon: Shield },
    { label: "Economic Impact", value: "$87B", icon: Globe },
  ]

  const values = [
    {
      icon: Heart,
      title: "Dignity & Respect",
      description: "Every person deserves a second chance and the opportunity to rebuild their life with dignity."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Leveraging cutting-edge Web3 technology to create new pathways for empowerment and opportunity."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Building trust through blockchain transparency and community-driven governance."
    },
    {
      icon: Globe,
      title: "Community Impact",
      description: "Creating systemic change that benefits individuals, families, and entire communities."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary),0.1),transparent_50%)]" />

        <div className="container relative py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-8">
              <Award className="mr-2 h-4 w-4" />
              Empowering Second Chances
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Breaking Barriers, Building Futures
            </h1>
            <p className="mt-8 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
              We're revolutionizing reentry support through Web3 technology, creating unprecedented opportunities
              for formerly incarcerated individuals to rebuild their lives and contribute to society.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-muted/30 via-muted/10 to-muted/30" />
        <div className="container relative">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">The Reality We're Changing</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These statistics represent real people facing real challenges. Our mission is to transform these numbers through innovation and community support.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className="group">
                  <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 text-center shadow-theme hover:shadow-theme-lg transition-all duration-300 hover:scale-105">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="h-10 w-10 text-primary" />
                      </div>
                      <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-card/90 to-secondary/10 backdrop-blur-sm p-12 text-center shadow-theme-lg">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full -translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full translate-x-16 translate-y-16" />

            <div className="relative">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/20 px-6 py-3 text-sm font-semibold text-primary mb-8">
                <Heart className="mr-2 h-5 w-5" />
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Empowering Second Chances Through Innovation
              </h2>
              <p className="text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
                To empower formerly incarcerated individuals through innovative Web3 technology, creating
                sustainable pathways to economic independence, community integration, and personal growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Problem & Solution Section */}
      <div className="container py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Challenge & Innovation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding the problem is the first step toward creating meaningful solutions that transform lives.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch">
            {/* Challenge Card */}
            <div className="group h-full">
              <div className="relative overflow-hidden rounded-2xl border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 via-card/90 to-destructive/10 backdrop-blur-sm p-8 shadow-theme hover:shadow-theme-lg transition-all duration-300 h-full flex flex-col">
                {/* Warning accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/50 to-orange-500/50" />

                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/20 mr-4">
                    <Target className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">The Challenge</h3>
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Over 70 million Americans have criminal records, facing systemic barriers to employment,
                    housing, education, and financial services. Traditional reentry programs often fall short,
                    leading to high recidivism rates and perpetuating cycles of poverty and incarceration.
                  </p>

                  <div className="space-y-3 mt-auto">
                    {[
                      "27% unemployment rate among formerly incarcerated individuals",
                      "68% recidivism rate within three years of release",
                      "$87 billion annual economic impact of employment barriers",
                      "Limited access to traditional financial services"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Solution Card */}
            <div className="group h-full">
              <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-card/90 to-secondary/10 backdrop-blur-sm p-8 shadow-theme hover:shadow-theme-lg transition-all duration-300 h-full flex flex-col">
                {/* Success accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-secondary/50" />

                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 mr-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight">Our Solution</h3>
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    We're building a comprehensive Web3 ecosystem that addresses these challenges through
                    innovative blockchain-based solutions, creating new opportunities for economic empowerment
                    and community support.
                  </p>

                  <div className="space-y-3 mt-auto">
                    {[
                      "Decentralized job marketplace with anonymous screening",
                      "Skill verification through blockchain credentials",
                      "Community-funded micro-investment opportunities",
                      "Peer-to-peer lending and financial services"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
        <div className="container relative">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-6 py-3 text-sm font-semibold text-secondary mb-8">
                <Shield className="mr-2 h-5 w-5" />
                Our Core Values
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 bg-gradient-to-r from-foreground via-secondary to-foreground bg-clip-text text-transparent">
                Principles That Guide Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do and shape our approach to empowerment and community building.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <div key={value.title} className="group">
                  <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm p-8 text-center shadow-theme hover:shadow-theme-lg transition-all duration-300 hover:scale-105 h-full">
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <value.icon className="h-10 w-10 text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container py-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-primary/10 via-card/90 to-secondary/10 backdrop-blur-sm p-12 text-center shadow-theme-lg">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-xl" />

            <div className="relative">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/20 px-6 py-3 text-sm font-semibold text-primary mb-8">
                <Globe className="mr-2 h-5 w-5" />
                Join the Movement
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                Together We Build Futures
              </h2>

              <p className="text-xl leading-8 text-muted-foreground max-w-3xl mx-auto mb-10">
                Together, we can break down barriers and build a more inclusive society where everyone
                has the opportunity to thrive. Your involvement makes the difference.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary via-primary to-secondary hover:from-primary/90 hover:via-primary/90 hover:to-secondary/90 text-primary-foreground border-2 border-primary/30 shadow-theme-lg hover:shadow-theme-xl hover:scale-105 transition-all duration-300 font-bold px-8 py-4 focus-visible-ring"
                >
                  <Heart className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Get Involved
                </a>
                <a
                  href="/web3"
                  className="group inline-flex items-center justify-center rounded-xl border-2 border-primary/30 text-primary hover:text-primary-foreground hover:bg-primary/90 backdrop-blur-md bg-card/80 shadow-theme hover:shadow-theme-lg hover:scale-105 transition-all duration-300 font-semibold px-8 py-4 focus-visible-ring"
                >
                  <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Learn About Web3
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
