import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description: "Connect with FormerlyIncarcerated.org. Whether you're interested in our programs, want to partner with us, or have questions about Web3 empowerment solutions, we're here to help.",
  keywords: [
    "contact formerly incarcerated",
    "get in touch",
    "partnership opportunities",
    "support request",
    "volunteer opportunities",
    "media inquiries",
    "community contact",
    "Web3 platform support",
    "reentry program contact",
    "formerly incarcerated support"
  ],
  openGraph: {
    title: "Contact Us - Get in Touch",
    description: "Connect with FormerlyIncarcerated.org. Whether you're interested in our programs, want to partner with us, or have questions, we're here to help.",
    url: "https://formerlyincarcerated.org/contact",
    type: "website",
  },
  twitter: {
    title: "Contact Us - Get in Touch",
    description: "Connect with FormerlyIncarcerated.org. Whether you're interested in our programs, want to partner with us, or have questions, we're here to help.",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
