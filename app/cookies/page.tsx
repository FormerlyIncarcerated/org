import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for FormerlyIncarcerated.org - How we use cookies and similar technologies.",
}

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Cookie Policy</h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          <strong>Effective Date:</strong> December 20, 2024<br />
          <strong>Last Updated:</strong> December 20, 2024
        </p>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">About This Cookie Policy</h2>
          <p>
            This Cookie Policy explains how FormerlyIncarcerated.org uses cookies and similar technologies 
            to provide, improve, and protect our services. We believe in transparency about how we collect 
            and use data to enhance your experience on our platform.
          </p>
        </div>

        <h2>1. What Are Cookies?</h2>

        <p>
          Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. 
          They help websites remember information about your visit, such as your preferred language and other settings, 
          which can make your next visit easier and the site more useful to you.
        </p>

        <h3>1.1 Types of Cookies</h3>
        <ul>
          <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser</li>
          <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period or until you delete them</li>
          <li><strong>First-Party Cookies:</strong> Cookies set by our website directly</li>
          <li><strong>Third-Party Cookies:</strong> Cookies set by external services we use</li>
        </ul>

        <h2>2. How We Use Cookies</h2>

        <h3>2.1 Essential Cookies</h3>
        <p>These cookies are necessary for our platform to function properly and cannot be disabled:</p>
        <ul>
          <li><strong>Authentication:</strong> Remember your login status and keep you signed in</li>
          <li><strong>Security:</strong> Protect against fraud and ensure secure connections</li>
          <li><strong>Session Management:</strong> Maintain your session state across page visits</li>
          <li><strong>Load Balancing:</strong> Distribute traffic across our servers efficiently</li>
        </ul>

        <h3>2.2 Functional Cookies</h3>
        <p>These cookies enhance your experience by remembering your preferences:</p>
        <ul>
          <li><strong>Theme Preferences:</strong> Remember your chosen color theme and display settings</li>
          <li><strong>Language Settings:</strong> Store your preferred language selection</li>
          <li><strong>Form Data:</strong> Remember information you've entered in forms (not sensitive data)</li>
          <li><strong>Accessibility:</strong> Store accessibility preferences and settings</li>
        </ul>

        <h3>2.3 Analytics Cookies</h3>
        <p>These cookies help us understand how our platform is used:</p>
        <ul>
          <li><strong>Usage Analytics:</strong> Track page views, user interactions, and feature usage</li>
          <li><strong>Performance Monitoring:</strong> Monitor site performance and identify issues</li>
          <li><strong>Error Tracking:</strong> Collect information about errors to improve our platform</li>
          <li><strong>A/B Testing:</strong> Test different versions of features to improve user experience</li>
        </ul>

        <h3>2.4 Marketing Cookies</h3>
        <p>These cookies help us provide relevant content and measure campaign effectiveness:</p>
        <ul>
          <li><strong>Content Personalization:</strong> Show relevant content based on your interests</li>
          <li><strong>Campaign Tracking:</strong> Measure the effectiveness of our outreach efforts</li>
          <li><strong>Social Media Integration:</strong> Enable sharing and social media features</li>
        </ul>

        <h2>3. Third-Party Cookies</h2>

        <p>We use several third-party services that may set their own cookies:</p>

        <h3>3.1 Analytics Services</h3>
        <ul>
          <li><strong>Google Analytics:</strong> Website traffic and user behavior analysis</li>
          <li><strong>Vercel Analytics:</strong> Performance monitoring and optimization</li>
        </ul>

        <h3>3.2 Communication Services</h3>
        <ul>
          <li><strong>Discord:</strong> Community integration and support</li>
          <li><strong>Email Services:</strong> Newsletter and communication delivery</li>
        </ul>

        <h3>3.3 Web3 Services</h3>
        <ul>
          <li><strong>WalletConnect:</strong> Web3 wallet connection and authentication</li>
          <li><strong>MetaMask:</strong> Ethereum wallet integration</li>
          <li><strong>Blockchain APIs:</strong> Interaction with blockchain networks</li>
        </ul>

        <h2>4. Cookie Management and Your Choices</h2>

        <h3>4.1 Browser Settings</h3>
        <p>You can control cookies through your browser settings:</p>
        <ul>
          <li><strong>Block All Cookies:</strong> Prevent all cookies from being set (may break functionality)</li>
          <li><strong>Block Third-Party Cookies:</strong> Allow only first-party cookies</li>
          <li><strong>Delete Cookies:</strong> Remove existing cookies from your device</li>
          <li><strong>Notification Settings:</strong> Get notified when cookies are being set</li>
        </ul>

        <h3>4.2 Platform Cookie Preferences</h3>
        <div className="bg-muted/50 rounded-lg p-6 my-6">
          <h4 className="font-semibold mb-4">Cookie Preference Center</h4>
          <p className="mb-4">
            You can manage your cookie preferences for our platform here. Note that disabling certain cookies 
            may affect your ability to use some features.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="font-medium">Essential Cookies</h5>
                <p className="text-sm text-muted-foreground">Required for basic platform functionality</p>
              </div>
              <span className="text-sm text-muted-foreground">Always Active</span>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="font-medium">Functional Cookies</h5>
                <p className="text-sm text-muted-foreground">Remember your preferences and settings</p>
              </div>
              <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">Enabled</button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="font-medium">Analytics Cookies</h5>
                <p className="text-sm text-muted-foreground">Help us improve our platform</p>
              </div>
              <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded">Enabled</button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="font-medium">Marketing Cookies</h5>
                <p className="text-sm text-muted-foreground">Personalize content and measure campaigns</p>
              </div>
              <button className="px-3 py-1 text-sm border rounded">Disabled</button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            <em>Note: This is a demonstration. Actual cookie management will be implemented in future updates.</em>
          </p>
        </div>

        <h3>4.3 Opt-Out Links</h3>
        <p>You can opt out of certain third-party tracking:</p>
        <ul>
          <li><strong>Google Analytics:</strong> <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out</a></li>
          <li><strong>Network Advertising Initiative:</strong> <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NAI Opt-out</a></li>
          <li><strong>Digital Advertising Alliance:</strong> <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">DAA Opt-out</a></li>
        </ul>

        <h2>5. Web3 and Blockchain Considerations</h2>

        <h3>5.1 Wallet Connections</h3>
        <p>
          When you connect a Web3 wallet, we may store connection preferences and wallet addresses in local storage 
          or cookies to maintain your session and provide a seamless experience.
        </p>

        <h3>5.2 Blockchain Data</h3>
        <p>
          Blockchain transactions and data are stored on public networks and are not controlled by cookies. 
          This data is permanent and cannot be deleted through cookie management.
        </p>

        <h2>6. Mobile Applications</h2>

        <p>
          Our mobile applications may use similar technologies to cookies, such as:
        </p>
        <ul>
          <li><strong>Local Storage:</strong> Store app preferences and settings</li>
          <li><strong>Device Identifiers:</strong> Unique identifiers for analytics and security</li>
          <li><strong>Push Notifications:</strong> Tokens for sending relevant notifications</li>
        </ul>

        <h2>7. Updates to This Policy</h2>

        <p>
          We may update this Cookie Policy from time to time to reflect changes in our practices or applicable laws. 
          When we make changes:
        </p>
        <ul>
          <li>We will post the updated policy on our platform</li>
          <li>We will update the "Last Updated" date</li>
          <li>For significant changes, we will provide notice through our platform or email</li>
        </ul>

        <h2>8. Contact Us</h2>

        <p>
          If you have questions about our use of cookies or this Cookie Policy, please contact us:
        </p>

        <div className="bg-muted/50 rounded-lg p-6 mt-6">
          <h3 className="font-semibold mb-4">Cookie Policy Contact</h3>
          <ul className="space-y-2">
            <li><strong>Email:</strong> privacy@formerlyincarcerated.org</li>
            <li><strong>Subject Line:</strong> "Cookie Policy Inquiry"</li>
            <li><strong>Mail:</strong> FormerlyIncarcerated.org Privacy Team<br />
                [Address to be updated upon incorporation]</li>
          </ul>
        </div>

        <h2>9. Browser-Specific Cookie Management</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Chrome</h4>
            <p className="text-sm">Settings → Privacy and Security → Cookies and other site data</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Firefox</h4>
            <p className="text-sm">Settings → Privacy & Security → Cookies and Site Data</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Safari</h4>
            <p className="text-sm">Preferences → Privacy → Manage Website Data</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Edge</h4>
            <p className="text-sm">Settings → Cookies and site permissions → Cookies and site data</p>
          </div>
        </div>

        <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 mt-8">
          <h3 className="font-semibold mb-4">Transparency in Technology</h3>
          <p>
            We believe in being transparent about how we use technology to improve your experience. 
            Cookies and similar technologies help us create a more personalized and effective platform 
            while respecting your privacy and giving you control over your data.
          </p>
        </div>
      </div>
    </div>
  )
}
