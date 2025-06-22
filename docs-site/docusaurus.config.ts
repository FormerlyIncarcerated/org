import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'FormerlyIncarcerated.org Documentation',
  tagline: 'Building second chances through Web3 technology and community-driven support systems',
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
            'https://github.com/4eckd/formerlyincarcerated/tree/master/docs-site/',
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
            'https://github.com/4eckd/formerlyincarcerated/tree/master/docs-site/',
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
      title: 'F.Inc. Docs',
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
        {to: '/blog', label: 'Updates', position: 'left'},
        {
          href: 'https://formerlyincarcerated.org',
          label: 'Main Site',
          position: 'right',
        },
        {
          href: 'https://github.com/4eckd/formerlyincarcerated',
          label: 'GitHub',
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
              label: 'Getting Started',
              to: '/docs/intro',
            },
            {
              label: 'Technical Guides',
              to: '/docs/technical',
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
              label: 'Discord',
              href: 'https://discord.gg/formerly-incarcerated-empowerment',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/FormerlyIncEmp',
            },
          ],
        },
        {
          title: 'Development',
          items: [
            {
              label: 'Updates',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/4eckd/formerlyincarcerated',
            },
            {
              label: 'Organization',
              href: 'https://github.com/FormerlyIncarcerated',
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
