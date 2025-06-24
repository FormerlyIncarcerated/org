#!/usr/bin/env node

/**
 * Generate Discussion Templates for FormerlyIncarcerated/org Repository
 * 
 * This script creates comprehensive discussion templates for all 24 categories
 * across 8 sections to guide community contributions and maintain quality.
 */

const fs = require('fs');
const path = require('path');

// Template configurations for each discussion category
const templates = [
  // Section 3: Issues & Support
  {
    filename: 'security-privacy-template.md',
    title: '🔒 [Security/Privacy Topic] - [Brief Description]',
    labels: ['security', 'privacy', 'audit'],
    category: 'Security & Privacy',
    icon: '🔒',
    content: `# 🔒 Security & Privacy Discussion Template

## 🛡️ **Security/Privacy Overview**

**Issue Type**: [Security Vulnerability/Privacy Concern/Audit Finding/Best Practice]
**Severity Level**: [Critical/High/Medium/Low]
**Affected Components**: [Smart Contracts/Frontend/Backend/Infrastructure]
**Current Status**: [Reported/Under Investigation/In Progress/Resolved]

## 🔍 **Security Details**

### Vulnerability/Concern Description
[Detailed description of the security issue or privacy concern]

### Affected Systems
- [ ] **Smart Contracts** - On-chain security
- [ ] **Frontend Application** - Client-side security
- [ ] **Backend APIs** - Server-side security
- [ ] **Database** - Data protection
- [ ] **Infrastructure** - DevOps and deployment security
- [ ] **User Data** - Privacy and data protection

### Impact Assessment
**Potential Impact**: [Description of potential consequences]
**Affected Users**: [Number and type of users affected]
**Data at Risk**: [Type of data that could be compromised]

## 🔒 **Privacy Considerations**

### Data Protection
**Personal Information**: [What personal data is involved]
**Sensitive Data**: [Criminal history, financial info, etc.]
**Data Minimization**: [How to collect only necessary data]
**User Consent**: [Consent mechanisms and user control]

### Compliance Requirements
- [ ] **GDPR** - European data protection regulation
- [ ] **CCPA** - California Consumer Privacy Act
- [ ] **HIPAA** - Health information (if applicable)
- [ ] **SOX** - Financial reporting (if applicable)

## 🛠️ **Mitigation & Solutions**

### Immediate Actions
- [ ] [Immediate action 1]
- [ ] [Immediate action 2]
- [ ] [Immediate action 3]

### Long-term Solutions
- [ ] [Long-term solution 1]
- [ ] [Long-term solution 2]
- [ ] [Long-term solution 3]

### Prevention Measures
- [ ] [Prevention measure 1]
- [ ] [Prevention measure 2]
- [ ] [Prevention measure 3]

---

**Building second chances through Web3 technology and community-driven support systems! 🚀**`
  },
  
  {
    filename: 'bug-reports-template.md',
    title: '🐛 [Bug Type] - [Brief Description]',
    labels: ['bug', 'issue', 'fix-needed'],
    category: 'Bug Reports',
    icon: '🐛',
    content: `# 🐛 Bug Reports Discussion Template

## 🐛 **Bug Overview**

**Bug Type**: [Frontend/Backend/Smart Contract/Mobile/Documentation]
**Severity**: [Critical/High/Medium/Low]
**Status**: [New/Confirmed/In Progress/Fixed/Closed]
**Affected Version**: [Version number or commit hash]

## 📱 **Environment Details**

### Platform Information
**Operating System**: [Windows/macOS/Linux/iOS/Android]
**Browser**: [Chrome/Firefox/Safari/Edge] - Version: [Version number]
**Device**: [Desktop/Mobile/Tablet] - [Specific device if mobile]
**Screen Resolution**: [If relevant to UI bugs]

### Application Environment
**Environment**: [Production/Staging/Development/Local]
**URL**: [Specific page or feature where bug occurs]
**User Type**: [Anonymous/Registered/Admin/Specific role]

## 🔄 **Bug Reproduction**

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]
4. [Continue with specific steps...]

### Expected Behavior
[What should happen when following the steps above]

### Actual Behavior
[What actually happens - describe the bug]

### Frequency
- [ ] **Always** - Bug occurs every time
- [ ] **Often** - Bug occurs most of the time
- [ ] **Sometimes** - Bug occurs occasionally
- [ ] **Rarely** - Bug occurs infrequently

## 📸 **Evidence & Documentation**

### Screenshots/Videos
[Attach screenshots, screen recordings, or videos showing the bug]

### Error Messages
\`\`\`
[Copy and paste any error messages, console logs, or stack traces]
\`\`\`

### Network Logs
[If relevant, include network request/response information]

## 🔍 **Additional Context**

### Related Issues
[Links to related bug reports or discussions]

### Workarounds
[Any temporary solutions or workarounds discovered]

### Impact Assessment
**User Impact**: [How this affects user experience]
**Business Impact**: [How this affects platform goals]
**Technical Impact**: [How this affects system performance]

---

**Building second chances through Web3 technology and community-driven support systems! 🚀**`
  },

  {
    filename: 'help-support-template.md',
    title: '❓ [Help Topic] - [Brief Question/Issue]',
    labels: ['help', 'support', 'question'],
    category: 'Help & Support',
    icon: '❓',
    content: `# ❓ Help & Support Discussion Template

## ❓ **Support Request Overview**

**Help Category**: [Getting Started/Technical Issue/Feature Usage/Account/Web3/Other]
**Urgency**: [High/Medium/Low]
**User Type**: [New User/Existing User/Developer/Partner]
**Platform**: [Web/Mobile/Both]

## 🎯 **Question/Issue Details**

### What are you trying to accomplish?
[Describe your goal or what you're trying to do]

### What specific help do you need?
[Be specific about what you need assistance with]

### What have you already tried?
[List any troubleshooting steps or solutions you've attempted]

## 📱 **Context & Environment**

### Platform Details
**Device**: [Desktop/Mobile/Tablet]
**Operating System**: [Windows/macOS/Linux/iOS/Android]
**Browser**: [Chrome/Firefox/Safari/Edge] - Version: [Version]

### Account Information
**Account Type**: [New/Existing/Premium/Developer]
**Registration Date**: [Approximate date if known]
**Last Successful Action**: [What was the last thing that worked]

## 🔄 **Steps Taken**

### What you did:
1. [Step 1]
2. [Step 2]
3. [Step 3]

### What happened:
[Describe the result or error you encountered]

### What you expected:
[Describe what you thought should happen]

## 📚 **Documentation Checked**

- [ ] **Getting Started Guide** - [Link to guide]
- [ ] **FAQ Section** - [Link to FAQ]
- [ ] **Technical Documentation** - [Link to docs]
- [ ] **Video Tutorials** - [Link to tutorials]
- [ ] **Community Discussions** - [Searched previous discussions]

## 🤝 **Additional Information**

### Error Messages
\`\`\`
[Copy any error messages you received]
\`\`\`

### Screenshots
[Attach screenshots if they help explain the issue]

### Related Features
[Mention any related features or areas of the platform]

---

**Building second chances through Web3 technology and community-driven support systems! 🚀**`
  }
];

/**
 * Generate template file
 */
function generateTemplate(template) {
  const templateDir = path.join(__dirname, '..', '.github', 'DISCUSSION_TEMPLATE');
  
  // Ensure directory exists
  if (!fs.existsSync(templateDir)) {
    fs.mkdirSync(templateDir, { recursive: true });
  }

  const filePath = path.join(templateDir, template.filename);
  
  const frontMatter = `---
title: "${template.title}"
labels: [${template.labels.map(label => `"${label}"`).join(', ')}]
---

`;

  const fullContent = frontMatter + template.content;
  
  fs.writeFileSync(filePath, fullContent, 'utf8');
  console.log(`✅ Generated: ${template.filename}`);
}

/**
 * Main execution function
 */
function generateAllTemplates() {
  console.log('🚀 Generating discussion templates for FormerlyIncarcerated/org...\n');

  try {
    templates.forEach(template => {
      generateTemplate(template);
    });

    console.log(`\n🎉 Successfully generated ${templates.length} discussion templates!`);
    console.log('\n📋 Generated Templates:');
    templates.forEach(template => {
      console.log(`   ${template.icon} ${template.category} - ${template.filename}`);
    });

    console.log('\n📁 Templates Location: .github/DISCUSSION_TEMPLATE/');
    console.log('🔗 Repository: https://github.com/FormerlyIncarcerated/org/discussions');

  } catch (error) {
    console.error('❌ Error generating templates:', error.message);
    process.exit(1);
  }
}

// Run the generator
if (require.main === module) {
  generateAllTemplates();
}

module.exports = { generateAllTemplates, templates };
