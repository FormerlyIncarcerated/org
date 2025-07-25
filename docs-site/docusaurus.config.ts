import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'FormerlyIncarcerated.org',
  tagline: 'Building Second Chances Through Web3 Technology',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.formerlyincarcerated.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FormerlyIncarcerated', // Usually your GitHub org/user name.
  projectName: 'formerlyincarcerated', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'FormerlyIncarcerated.org',
      logo: {
        alt: 'FormerlyIncarcerated.org Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {to: '/docs/whitepaper-github', label: 'Whitepaper', position: 'left'},
        {to: '/docs/roadmap', label: 'Roadmap', position: 'left'},
        {
          href: 'https://github.com/FormerlyIncarcerated',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://formerlyincarcerated.org',
          label: 'Main Site',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Get Started',
              to: '/docs/intro',
            },
            {
              label: 'Whitepaper',
              to: '/docs/whitepaper-github',
            },
            {
              label: 'Technical Docs',
              to: '/docs/technical/WEB3_ARCHITECTURE',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Main Website',
              href: 'https://formerlyincarcerated.org',
            },
            {
              label: 'Contact',
              href: 'https://formerlyincarcerated.org/contact',
            },
            {
              label: 'Support',
              href: 'https://formerlyincarcerated.org/support',
            },
          ],
        },
        {
          title: 'Development',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/FormerlyIncarcerated',
            },
            {
              label: 'Roadmap',
              to: '/docs/roadmap',
            },
            {
              label: 'Contributing',
              href: 'https://github.com/FormerlyIncarcerated/formerlyincarcerated',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FormerlyIncarcerated.org. Building second chances through Web3 technology.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
