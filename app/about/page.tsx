import { Users, Target, Heart, Zap, Shield, Globe } from "lucide-react"
import { siteConfig } from "@/lib/config"

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
    <div className="container py-12 md:py-24">
      {/* Hero Section */}
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Breaking Barriers, Building Futures
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          We're revolutionizing reentry support through Web3 technology, creating unprecedented opportunities 
          for formerly incarcerated individuals to rebuild their lives and contribute to society.
        </p>
      </div>

      {/* Stats Section */}
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-4">
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="mx-auto mt-24 max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mission</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            To empower formerly incarcerated individuals through innovative Web3 technology, creating 
            sustainable pathways to economic independence, community integration, and personal growth.
          </p>
        </div>
      </div>

      {/* Problem Section */}
      <div className="mx-auto mt-24 max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold tracking-tight">The Challenge</h3>
            <p className="mt-4 text-muted-foreground">
              Over 70 million Americans have criminal records, facing systemic barriers to employment, 
              housing, education, and financial services. Traditional reentry programs often fall short, 
              leading to high recidivism rates and perpetuating cycles of poverty and incarceration.
            </p>
            <ul className="mt-6 space-y-2 text-muted-foreground">
              <li>• 27% unemployment rate among formerly incarcerated individuals</li>
              <li>• 68% recidivism rate within three years of release</li>
              <li>• $87 billion annual economic impact of employment barriers</li>
              <li>• Limited access to traditional financial services</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold tracking-tight">Our Solution</h3>
            <p className="mt-4 text-muted-foreground">
              We're building a comprehensive Web3 ecosystem that addresses these challenges through 
              innovative blockchain-based solutions, creating new opportunities for economic empowerment 
              and community support.
            </p>
            <ul className="mt-6 space-y-2 text-muted-foreground">
              <li>• Decentralized job marketplace with anonymous screening</li>
              <li>• Skill verification through blockchain credentials</li>
              <li>• Community-funded micro-investment opportunities</li>
              <li>• Peer-to-peer lending and financial services</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mx-auto mt-24 max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Values</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            These core values guide everything we do and shape our approach to empowerment.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{value.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mx-auto mt-24 max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Join Our Movement</h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Together, we can break down barriers and build a more inclusive society where everyone 
          has the opportunity to thrive.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90"
          >
            Get Involved
          </a>
          <a
            href="/programs"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            Learn About Our Programs
          </a>
        </div>
      </div>
    </div>
  )
}
