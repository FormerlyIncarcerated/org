# 🌐 DNS Configuration Guide for FormerlyIncarcerated.org

This guide provides step-by-step instructions for configuring DNS records to point your domain to your new web host.

## 📋 Prerequisites

- **Domain**: formerlyincarcerated.org
- **Web Host IPv4 Address**: 194.31.143.6
- **Web Host IPv6 Address**: 2a11:29c0:4f50:5::10
- **DNS Provider Access**: Access to your domain registrar or DNS provider
- **SSL Certificate**: Will be configured after DNS propagation

---

## 🎯 Required DNS Records

### 1. A Records (IPv4 Address Records)

These point your domain directly to your server's IP address:

```
Record Type: A
Name/Host: @
Value/Points to: 194.31.143.6
TTL: 300 (5 minutes) or 3600 (1 hour)

Record Type: A
Name/Host: www
Value/Points to: 194.31.143.6
TTL: 300 (5 minutes) or 3600 (1 hour)

Record Type: A
Name/Host: docs
Value/Points to: 194.31.143.6
TTL: 300 (5 minutes) or 3600 (1 hour)
```

### 2a. AAAA Records (IPv6 Address Records)

For modern IPv6 support, also add these records:

```
Record Type: AAAA
Name/Host: @
Value/Points to: 2a11:29c0:4f50:5::10
TTL: 300 (5 minutes) or 3600 (1 hour)

Record Type: AAAA
Name/Host: www
Value/Points to: 2a11:29c0:4f50:5::10
TTL: 300 (5 minutes) or 3600 (1 hour)

Record Type: AAAA
Name/Host: docs
Value/Points to: 2a11:29c0:4f50:5::10
TTL: 300 (5 minutes) or 3600 (1 hour)
```

### 2. CNAME Records (Canonical Name Records)

Alternative approach for subdomains (choose either A records OR CNAME for subdomains):

```
Record Type: CNAME
Name/Host: www
Value/Points to: formerlyincarcerated.org
TTL: 300 (5 minutes) or 3600 (1 hour)

Record Type: CNAME
Name/Host: docs
Value/Points to: formerlyincarcerated.org
TTL: 300 (5 minutes) or 3600 (1 hour)
```

### 3. MX Records (Mail Exchange) - Optional

If you plan to use email with your domain:

```
Record Type: MX
Name/Host: @
Value/Points to: mail.formerlyincarcerated.org
Priority: 10
TTL: 3600 (1 hour)
```

### 4. TXT Records (Text Records)

For domain verification and security:

```
# Domain verification (replace with actual verification code)
Record Type: TXT
Name/Host: @
Value: "v=spf1 include:_spf.google.com ~all"
TTL: 3600 (1 hour)

# DMARC policy (optional but recommended)
Record Type: TXT
Name/Host: _dmarc
Value: "v=DMARC1; p=none; rua=mailto:dmarc@formerlyincarcerated.org"
TTL: 3600 (1 hour)

# Domain verification for services (add as needed)
Record Type: TXT
Name/Host: @
Value: "google-site-verification=YOUR_VERIFICATION_CODE"
TTL: 3600 (1 hour)
```

---

## 🔧 DNS Provider Configuration Steps

### For Cloudflare

1. **Login to Cloudflare Dashboard**
   - Go to https://dash.cloudflare.com
   - Select your domain: formerlyincarcerated.org

2. **Navigate to DNS Settings**
   - Click on "DNS" in the top menu
   - You'll see the DNS records management interface

3. **Add A Records**
   ```
   Type: A
   Name: @
   IPv4 address: 194.31.143.6
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

   ```
   Type: A
   Name: www
   IPv4 address: 194.31.143.6
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

   ```
   Type: A
   Name: docs
   IPv4 address: 194.31.143.6
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

4. **Add AAAA Records (IPv6)**
   ```
   Type: AAAA
   Name: @
   IPv6 address: 2a11:29c0:4f50:5::10
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

   ```
   Type: AAAA
   Name: www
   IPv6 address: 2a11:29c0:4f50:5::10
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

   ```
   Type: AAAA
   Name: docs
   IPv6 address: 2a11:29c0:4f50:5::10
   Proxy status: DNS only (gray cloud)
   TTL: Auto
   ```

4. **SSL/TLS Settings**
   - Go to SSL/TLS → Overview
   - Set encryption mode to "Full (strict)" after SSL certificates are installed

### For Namecheap

1. **Login to Namecheap Account**
   - Go to https://ap.www.namecheap.com/
   - Navigate to Domain List

2. **Manage DNS**
   - Click "Manage" next to your domain
   - Go to "Advanced DNS" tab

3. **Add A Records**
   ```
   Type: A Record
   Host: @
   Value: 194.31.143.6
   TTL: 5 min
   ```

   ```
   Type: A Record
   Host: www
   Value: 194.31.143.6
   TTL: 5 min
   ```

   ```
   Type: A Record
   Host: docs
   Value: 194.31.143.6
   TTL: 5 min
   ```

4. **Add AAAA Records (IPv6)**
   ```
   Type: AAAA Record
   Host: @
   Value: 2a11:29c0:4f50:5::10
   TTL: 5 min
   ```

   ```
   Type: AAAA Record
   Host: www
   Value: 2a11:29c0:4f50:5::10
   TTL: 5 min
   ```

   ```
   Type: AAAA Record
   Host: docs
   Value: 2a11:29c0:4f50:5::10
   TTL: 5 min
   ```

### For GoDaddy

1. **Login to GoDaddy Account**
   - Go to https://account.godaddy.com/
   - Navigate to "My Products"

2. **Manage DNS**
   - Find your domain and click "DNS"
   - Click "Manage Zones"

3. **Add Records**
   - Click "Add" to create new records
   - Follow the same pattern as above

### For Google Domains

1. **Login to Google Domains**
   - Go to https://domains.google.com/
   - Select your domain

2. **Configure DNS**
   - Click "DNS" in the left sidebar
   - Scroll to "Custom resource records"

3. **Add Records**
   - Use the same record format as described above

---

## 🔍 DNS Record Verification

### Using Command Line Tools

```bash
# Check A record for main domain
dig formerlyincarcerated.org A

# Check A record for www subdomain
dig www.formerlyincarcerated.org A

# Check A record for docs subdomain
dig docs.formerlyincarcerated.org A

# Check all records
dig formerlyincarcerated.org ANY
```

### Using Online Tools

- **DNS Checker**: https://dnschecker.org/
- **What's My DNS**: https://www.whatsmydns.net/
- **DNS Propagation Checker**: https://www.dnsmap.io/

---

## ⏱️ DNS Propagation Timeline

- **Local ISP**: 5-30 minutes
- **Regional**: 1-4 hours  
- **Global**: 24-48 hours (maximum)
- **TTL Impact**: Lower TTL = faster updates

### Checking Propagation Status

```bash
# Check from different DNS servers
nslookup formerlyincarcerated.org 8.8.8.8
nslookup formerlyincarcerated.org 1.1.1.1
nslookup formerlyincarcerated.org 208.67.222.222
```

---

## 🔒 SSL Certificate Setup

After DNS propagation, set up SSL certificates:

```bash
# Install SSL certificates for all domains
sudo certbot --nginx -d formerlyincarcerated.org -d www.formerlyincarcerated.org -d docs.formerlyincarcerated.org

# Test automatic renewal
sudo certbot renew --dry-run
```

---

## 🚨 Troubleshooting

### Common Issues

1. **DNS Not Propagating**
   - Wait 24-48 hours for full propagation
   - Clear local DNS cache: `sudo systemctl flush-dns`
   - Try different DNS servers

2. **SSL Certificate Errors**
   - Ensure DNS is fully propagated before running Certbot
   - Check Nginx configuration syntax: `nginx -t`

3. **Subdomain Not Working**
   - Verify A records for subdomains are correct
   - Check Nginx virtual host configuration

### DNS Cache Clearing

```bash
# Linux
sudo systemctl flush-dns

# macOS
sudo dscacheutil -flushcache

# Windows
ipconfig /flushdns
```

---

## 📊 Final DNS Configuration Summary

Once configured, your DNS should resolve as follows:

| Domain | Type | Points To | Purpose |
|--------|------|-----------|---------|
| formerlyincarcerated.org | A | [YOUR_SERVER_IP] | Main website |
| www.formerlyincarcerated.org | A | [YOUR_SERVER_IP] | WWW redirect |
| docs.formerlyincarcerated.org | A | [YOUR_SERVER_IP] | Documentation |

---

## ✅ Verification Checklist

- [ ] A record for @ (root domain) pointing to server IP
- [ ] A record for www subdomain pointing to server IP  
- [ ] A record for docs subdomain pointing to server IP
- [ ] DNS propagation completed (check with online tools)
- [ ] SSL certificates installed and working
- [ ] All domains redirect to HTTPS
- [ ] Main site loads at https://formerlyincarcerated.org
- [ ] WWW redirect works: https://www.formerlyincarcerated.org
- [ ] Docs site loads at https://docs.formerlyincarcerated.org

---

## 🆘 Support

If you encounter issues:

1. **Check DNS propagation** using online tools
2. **Verify server configuration** (Nginx, PM2, applications running)
3. **Review server logs** for errors
4. **Contact DNS provider support** if records aren't updating

---

**🎉 Once DNS is configured and propagated, your FormerlyIncarcerated.org platform will be live on your new web host!**
