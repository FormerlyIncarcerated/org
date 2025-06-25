import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for FormerlyIncarcerated.org - Platform usage terms and conditions.",
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          <strong>Effective Date:</strong> December 20, 2024<br />
          <strong>Last Updated:</strong> December 20, 2024
        </p>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome to FormerlyIncarcerated.org</h2>
          <p>
            These Terms of Service ("Terms") govern your use of the FormerlyIncarcerated.org platform and services. 
            By accessing or using our platform, you agree to be bound by these Terms. Please read them carefully.
          </p>
        </div>

        <h2>1. Acceptance of Terms</h2>

        <p>
          By accessing, browsing, or using the FormerlyIncarcerated.org platform ("Platform"), you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our Platform.
        </p>

        <h2>2. Description of Service</h2>

        <h3>2.1 Platform Purpose</h3>
        <p>
          FormerlyIncarcerated.org is a Web3-powered platform designed to empower formerly incarcerated individuals through:
        </p>
        <ul>
          <li>Job matching and employment opportunities</li>
          <li>Skill verification and credentialing</li>
          <li>Community governance and decision-making</li>
          <li>Access to funding and financial services</li>
          <li>Educational resources and support</li>
        </ul>

        <h3>2.2 Web3 Features</h3>
        <p>
          Our platform incorporates blockchain technology and Web3 features, including but not limited to:
        </p>
        <ul>
          <li>Decentralized identity management</li>
          <li>Token-based governance systems</li>
          <li>Smart contract interactions</li>
          <li>Cryptocurrency transactions</li>
        </ul>

        <h2>3. Eligibility and Account Registration</h2>

        <h3>3.1 Eligibility Requirements</h3>
        <ul>
          <li>You must be at least 18 years old</li>
          <li>You must have the legal capacity to enter into binding agreements</li>
          <li>You must not be prohibited from using our services under applicable law</li>
          <li>You must provide accurate and complete information during registration</li>
        </ul>

        <h3>3.2 Account Security</h3>
        <ul>
          <li>You are responsible for maintaining the security of your account credentials</li>
          <li>You must notify us immediately of any unauthorized access to your account</li>
          <li>You are responsible for all activities that occur under your account</li>
          <li>We reserve the right to suspend or terminate accounts that violate these Terms</li>
        </ul>

        <h2>4. User Conduct and Community Guidelines</h2>

        <h3>4.1 Acceptable Use</h3>
        <p>You agree to use our Platform in a manner that:</p>
        <ul>
          <li>Respects the dignity and rights of all community members</li>
          <li>Promotes positive and constructive interactions</li>
          <li>Complies with all applicable laws and regulations</li>
          <li>Supports the mission of empowerment and second chances</li>
        </ul>

        <h3>4.2 Prohibited Activities</h3>
        <p>You agree not to:</p>
        <ul>
          <li>Harass, discriminate against, or harm other users</li>
          <li>Share false, misleading, or fraudulent information</li>
          <li>Violate any laws or regulations</li>
          <li>Interfere with the Platform's operation or security</li>
          <li>Use the Platform for unauthorized commercial purposes</li>
          <li>Attempt to gain unauthorized access to other accounts or systems</li>
        </ul>

        <h2>5. Content and Intellectual Property</h2>

        <h3>5.1 User Content</h3>
        <ul>
          <li>You retain ownership of content you create and share on the Platform</li>
          <li>You grant us a license to use your content to provide and improve our services</li>
          <li>You represent that you have the right to share any content you post</li>
          <li>You are responsible for the accuracy and legality of your content</li>
        </ul>

        <h3>5.2 Platform Content</h3>
        <ul>
          <li>We own or license all Platform content, including software, text, images, and designs</li>
          <li>You may not copy, modify, or distribute our content without permission</li>
          <li>Open-source components are governed by their respective licenses</li>
        </ul>

        <h2>6. Web3 and Blockchain Terms</h2>

        <h3>6.1 Wallet Connections</h3>
        <ul>
          <li>You are responsible for the security of your Web3 wallets and private keys</li>
          <li>We do not have access to or control over your private keys</li>
          <li>Blockchain transactions are irreversible and final</li>
          <li>You understand the risks associated with cryptocurrency and DeFi protocols</li>
        </ul>

        <h3>6.2 Token Usage</h3>
        <ul>
          <li>Platform tokens are utility tokens for governance and platform services</li>
          <li>Token values may fluctuate and could become worthless</li>
          <li>Tokens are not securities or investment contracts</li>
          <li>You are responsible for tax implications of token transactions</li>
        </ul>

        <h3>6.3 Smart Contracts</h3>
        <ul>
          <li>Smart contracts are deployed on public blockchains and operate autonomously</li>
          <li>We cannot reverse or modify smart contract transactions</li>
          <li>You should understand smart contract functionality before interacting</li>
          <li>Smart contracts may contain bugs or vulnerabilities</li>
        </ul>

        <h2>7. Privacy and Data Protection</h2>

        <p>
          Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
        </p>

        <h2>8. Disclaimers and Limitations</h2>

        <h3>8.1 Service Availability</h3>
        <ul>
          <li>We strive to maintain Platform availability but cannot guarantee uninterrupted service</li>
          <li>We may suspend or modify services for maintenance, updates, or other reasons</li>
          <li>Third-party services integrated with our Platform may have their own availability limitations</li>
        </ul>

        <h3>8.2 No Warranties</h3>
        <p>
          THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
          WE DISCLAIM ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, 
          AND NON-INFRINGEMENT.
        </p>

        <h3>8.3 Limitation of Liability</h3>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, 
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
        </p>

        <h2>9. Indemnification</h2>

        <p>
          You agree to indemnify and hold harmless FormerlyIncarcerated.org, its affiliates, officers, directors, 
          employees, and agents from any claims, damages, losses, or expenses arising from your use of the Platform 
          or violation of these Terms.
        </p>

        <h2>10. Termination</h2>

        <h3>10.1 Termination by You</h3>
        <ul>
          <li>You may terminate your account at any time by contacting us</li>
          <li>Termination does not affect blockchain transactions already completed</li>
          <li>Some data may be retained as required by law or for legitimate business purposes</li>
        </ul>

        <h3>10.2 Termination by Us</h3>
        <ul>
          <li>We may suspend or terminate accounts that violate these Terms</li>
          <li>We may discontinue the Platform with reasonable notice</li>
          <li>We will provide notice of termination except in cases of serious violations</li>
        </ul>

        <h2>11. Dispute Resolution</h2>

        <h3>11.1 Informal Resolution</h3>
        <p>
          We encourage resolving disputes through direct communication. Please contact us at 
          legal@formerlyincarcerated.org to discuss any concerns.
        </p>

        <h3>11.2 Binding Arbitration</h3>
        <p>
          Any disputes that cannot be resolved informally will be settled through binding arbitration 
          in accordance with the rules of the American Arbitration Association.
        </p>

        <h3>11.3 Class Action Waiver</h3>
        <p>
          You agree to resolve disputes individually and waive the right to participate in class actions 
          or collective proceedings.
        </p>

        <h2>12. Governing Law</h2>

        <p>
          These Terms are governed by the laws of [Jurisdiction to be determined upon incorporation], 
          without regard to conflict of law principles.
        </p>

        <h2>13. Changes to Terms</h2>

        <p>
          We may update these Terms from time to time. When we make changes:
        </p>
        <ul>
          <li>We will post the updated Terms on our Platform</li>
          <li>We will update the "Last Updated" date</li>
          <li>For material changes, we will provide 30 days' notice</li>
          <li>Continued use of the Platform constitutes acceptance of updated Terms</li>
        </ul>

        <h2>14. Severability</h2>

        <p>
          If any provision of these Terms is found to be unenforceable, the remaining provisions will remain in full force and effect.
        </p>

        <h2>15. Contact Information</h2>

        <p>
          If you have questions about these Terms, please contact us:
        </p>

        <div className="bg-muted/50 rounded-lg p-6 mt-6">
          <h3 className="font-semibold mb-4">Legal Contact Information</h3>
          <ul className="space-y-2">
            <li><strong>Email:</strong> legal@formerlyincarcerated.org</li>
            <li><strong>Mail:</strong> FormerlyIncarcerated.org Legal Team<br />
                [Address to be updated upon incorporation]</li>
            <li><strong>Response Time:</strong> We aim to respond to legal inquiries within 10 business days</li>
          </ul>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
          <h3 className="font-semibold mb-4">Our Commitment to Fair Terms</h3>
          <p>
            We believe in creating fair and transparent terms that protect both our community and our platform. 
            These Terms are designed to foster a safe, supportive environment where formerly incarcerated individuals 
            can access opportunities and build better futures. If you have concerns about any provision, 
            please reach out to us for clarification.
          </p>
        </div>
      </div>
    </div>
  )
}
