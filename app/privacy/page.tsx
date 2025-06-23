import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for FormerlyIncarcerated.org - How we protect and handle your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          <strong>Effective Date:</strong> December 20, 2024<br />
          <strong>Last Updated:</strong> December 20, 2024
        </p>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Our Commitment to Privacy</h2>
          <p>
            At FormerlyIncarcerated.org, we understand that privacy is fundamental to dignity and empowerment. 
            This Privacy Policy explains how we collect, use, protect, and share your information when you use our platform. 
            We are committed to transparency and giving you control over your personal data.
          </p>
        </div>

        <h2>1. Information We Collect</h2>

        <h3>1.1 Information You Provide</h3>
        <ul>
          <li><strong>Account Information:</strong> When you create an account, we collect your email address, chosen username, and any profile information you provide.</li>
          <li><strong>Survey Responses:</strong> Information you provide in our community surveys to help us understand your needs and improve our services.</li>
          <li><strong>Communications:</strong> Messages you send us through contact forms, support requests, or community forums.</li>
          <li><strong>Verification Information:</strong> Skills, certifications, and achievements you choose to verify on our platform.</li>
        </ul>

        <h3>1.2 Information We Collect Automatically</h3>
        <ul>
          <li><strong>Usage Data:</strong> How you interact with our platform, including pages visited, features used, and time spent.</li>
          <li><strong>Device Information:</strong> Information about your device, browser, and operating system.</li>
          <li><strong>Log Data:</strong> Server logs that include IP addresses, timestamps, and error reports.</li>
          <li><strong>Cookies and Tracking:</strong> See our Cookie Policy for detailed information about our use of cookies and similar technologies.</li>
        </ul>

        <h3>1.3 Blockchain and Web3 Data</h3>
        <ul>
          <li><strong>Wallet Addresses:</strong> Public blockchain addresses when you connect a Web3 wallet.</li>
          <li><strong>Transaction Data:</strong> Public blockchain transactions related to platform activities.</li>
          <li><strong>Token Holdings:</strong> Information about governance and utility tokens you hold.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>

        <h3>2.1 Platform Services</h3>
        <ul>
          <li>Provide and maintain our platform services</li>
          <li>Process and respond to your requests</li>
          <li>Facilitate job matching and skill verification</li>
          <li>Enable community governance and participation</li>
        </ul>

        <h3>2.2 Communication</h3>
        <ul>
          <li>Send you important platform updates and notifications</li>
          <li>Respond to your inquiries and support requests</li>
          <li>Share relevant opportunities and resources</li>
          <li>Provide educational content and community updates</li>
        </ul>

        <h3>2.3 Improvement and Analytics</h3>
        <ul>
          <li>Analyze platform usage to improve our services</li>
          <li>Conduct research to better serve our community</li>
          <li>Develop new features and functionality</li>
          <li>Ensure platform security and prevent fraud</li>
        </ul>

        <h2>3. Information Sharing and Disclosure</h2>

        <h3>3.1 We Do Not Sell Your Data</h3>
        <p>
          We do not sell, rent, or trade your personal information to third parties for their marketing purposes.
        </p>

        <h3>3.2 Sharing with Your Consent</h3>
        <ul>
          <li>With employers when you apply for jobs (only information you choose to share)</li>
          <li>With service providers when you request specific services</li>
          <li>In community forums when you choose to participate publicly</li>
        </ul>

        <h3>3.3 Service Providers</h3>
        <p>
          We may share information with trusted service providers who help us operate our platform, including:
        </p>
        <ul>
          <li>Cloud hosting and infrastructure providers</li>
          <li>Analytics and performance monitoring services</li>
          <li>Communication and email services</li>
          <li>Security and fraud prevention services</li>
        </ul>

        <h3>3.4 Legal Requirements</h3>
        <p>
          We may disclose information when required by law or to protect our rights, safety, or the safety of others.
        </p>

        <h2>4. Data Security</h2>

        <h3>4.1 Security Measures</h3>
        <ul>
          <li><strong>Encryption:</strong> All data is encrypted in transit and at rest</li>
          <li><strong>Access Controls:</strong> Strict access controls and authentication requirements</li>
          <li><strong>Regular Audits:</strong> Regular security audits and vulnerability assessments</li>
          <li><strong>Incident Response:</strong> Comprehensive incident response and notification procedures</li>
        </ul>

        <h3>4.2 Web3 Security</h3>
        <ul>
          <li>Smart contracts audited by reputable security firms</li>
          <li>Multi-signature wallets for treasury management</li>
          <li>Zero-knowledge proofs for privacy-preserving verification</li>
          <li>Decentralized storage for sensitive documents</li>
        </ul>

        <h2>5. Your Privacy Rights</h2>

        <h3>5.1 Access and Control</h3>
        <ul>
          <li><strong>Access:</strong> Request a copy of your personal data</li>
          <li><strong>Correction:</strong> Update or correct inaccurate information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal data</li>
          <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
        </ul>

        <h3>5.2 Communication Preferences</h3>
        <ul>
          <li>Opt out of marketing communications</li>
          <li>Choose notification preferences</li>
          <li>Control public profile visibility</li>
        </ul>

        <h3>5.3 Web3 and Blockchain Rights</h3>
        <ul>
          <li>Control over wallet connections and permissions</li>
          <li>Choice in blockchain data sharing</li>
          <li>Governance participation preferences</li>
        </ul>

        <h2>6. Data Retention</h2>

        <p>
          We retain your information only as long as necessary to provide our services and fulfill the purposes outlined in this policy:
        </p>
        <ul>
          <li><strong>Account Data:</strong> Retained while your account is active and for 3 years after closure</li>
          <li><strong>Survey Data:</strong> Retained in anonymized form for research purposes</li>
          <li><strong>Communication Data:</strong> Retained for 2 years for support and legal purposes</li>
          <li><strong>Blockchain Data:</strong> Permanently stored on public blockchains (cannot be deleted)</li>
        </ul>

        <h2>7. International Data Transfers</h2>

        <p>
          Our platform may be accessed from around the world. When you use our services, your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data during international transfers.
        </p>

        <h2>8. Children's Privacy</h2>

        <p>
          Our platform is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected such information, we will take steps to delete it promptly.
        </p>

        <h2>9. Changes to This Policy</h2>

        <p>
          We may update this Privacy Policy from time to time. When we make changes, we will:
        </p>
        <ul>
          <li>Post the updated policy on our platform</li>
          <li>Update the "Last Updated" date</li>
          <li>Notify you of significant changes via email or platform notification</li>
          <li>For material changes, provide 30 days' notice before they take effect</li>
        </ul>

        <h2>10. Contact Us</h2>

        <p>
          If you have questions about this Privacy Policy or our privacy practices, please contact us:
        </p>

        <div className="bg-muted/50 rounded-lg p-6 mt-6">
          <h3 className="font-semibold mb-4">Privacy Contact Information</h3>
          <ul className="space-y-2">
            <li><strong>Email:</strong> privacy@formerlyincarcerated.org</li>
            <li><strong>Mail:</strong> FormerlyIncarcerated.org Privacy Team<br />
                [Address to be updated upon incorporation]</li>
            <li><strong>Response Time:</strong> We aim to respond to privacy inquiries within 30 days</li>
          </ul>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
          <h3 className="font-semibold mb-4">Your Privacy Matters</h3>
          <p>
            We believe that privacy is a fundamental right, especially for individuals who have experienced the criminal justice system. 
            Our commitment to privacy-by-design ensures that you maintain control over your personal information while accessing the 
            opportunities and support you deserve.
          </p>
        </div>
      </div>
    </div>
  )
}
