# DNS Setup Instructions for docs.formerlyincarcerated.org

## Cloudflare DNS Configuration

To set up the docs subdomain using Cloudflare DNS, follow these steps:

### 1. Access Cloudflare Dashboard
- Log in to your Cloudflare account
- Select the `formerlyincarcerated.org` domain

### 2. Add DNS Record
Add a new CNAME record with the following configuration:

```
Type: CNAME
Name: docs
Target: cname.vercel-dns.com
TTL: Auto
Proxy Status: Proxied (orange cloud)
```

### 3. Vercel Project Configuration

#### For Main App (formerlyincarcerated.org):
- Domain: `formerlyincarcerated.org`
- Domain: `www.formerlyincarcerated.org`

#### For Docs App (docs.formerlyincarcerated.org):
- Domain: `docs.formerlyincarcerated.org`

### 4. Verification Steps
1. Deploy both projects to Vercel
2. Add the custom domains in Vercel dashboard
3. Wait for DNS propagation (usually 5-10 minutes)
4. Test the subdomain: https://docs.formerlyincarcerated.org

### 5. SSL Certificate
Cloudflare will automatically handle SSL certificates for the subdomain.
Ensure SSL/TLS encryption mode is set to "Full (strict)" in Cloudflare.

## Alternative: Direct Vercel DNS
If not using Cloudflare proxy:
```
Type: CNAME
Name: docs
Target: [your-vercel-project].vercel.app
```

## Troubleshooting
- Check DNS propagation: https://dnschecker.org
- Verify Vercel domain configuration
- Ensure both projects are deployed successfully
