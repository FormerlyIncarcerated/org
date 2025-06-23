import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Community Survey - Help Shape the Future",
  description: "Share your insights to help us design the most impactful Web3 platform for formerly incarcerated individuals. Your input will guide our development of blockchain-based solutions for reentry support.",
  keywords: [
    "community survey",
    "formerly incarcerated feedback",
    "Web3 platform development",
    "reentry support survey",
    "blockchain solutions feedback",
    "community input",
    "user research",
    "social impact survey",
    "platform design feedback",
    "formerly incarcerated community"
  ],
  openGraph: {
    title: "Community Survey - Help Shape the Future",
    description: "Share your insights to help us design the most impactful Web3 platform for formerly incarcerated individuals.",
    url: "https://formerlyincarcerated.org/survey",
    type: "website",
  },
  twitter: {
    title: "Community Survey - Help Shape the Future",
    description: "Share your insights to help us design the most impactful Web3 platform for formerly incarcerated individuals.",
  },
}

export default function SurveyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
