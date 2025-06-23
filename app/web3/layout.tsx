import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Web3 Technologies - Empowering Through Innovation",
  description: "Discover how revolutionary Web3 technologies restore dignity, create boundless opportunities, and empower formerly incarcerated individuals. Explore blockchain, DeFi, smart contracts, and decentralized governance solutions.",
  keywords: [
    "Web3 empowerment",
    "blockchain technology",
    "DeFi for social good",
    "smart contracts",
    "decentralized governance",
    "digital identity",
    "cryptocurrency opportunities",
    "blockchain education",
    "Web3 social impact",
    "decentralized finance",
    "peer-to-peer lending",
    "digital inclusion"
  ],
  openGraph: {
    title: "Web3 Technologies - Empowering Through Innovation",
    description: "Discover how revolutionary Web3 technologies restore dignity and create boundless opportunities for formerly incarcerated individuals.",
    url: "https://formerlyincarcerated.org/web3",
    type: "website",
  },
  twitter: {
    title: "Web3 Technologies - Empowering Through Innovation",
    description: "Discover how revolutionary Web3 technologies restore dignity and create boundless opportunities for formerly incarcerated individuals.",
  },
}

export default function Web3Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
