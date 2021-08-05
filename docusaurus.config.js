const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const math = require('remark-math');
const katex = require('rehype-katex');

const versions = require('./versions.json');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'mpegCoder',
  tagline: 'This is a C++ based FFmpeg Encoder/Decoder for Python 3.5+ & Numpy 1.13+. Both Linux & Win versions are provided. Theoretically you do not need to install FFmpeg for using this library.',
  url: 'https://cainmagi.github.io',
  baseUrl: '/FFmpeg-Encoder-Decoder-for-Python/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'cainmagi', // Usually your GitHub org/user name.
  projectName: 'mpegCoder', // Usually your repo name.
  plugins: [
    'docusaurus-plugin-sass',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-cn'],
  },
  themeConfig: {
    navbar: {
      title: 'mpegCoder',
      logo: {
        alt: 'mpegCoder Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'introduction',
          position: 'left',
          label: 'Tutorial',
        },
        {
          type: 'doc',
          docId: 'apis',
          position: 'left',
          label: 'APIs',
        },
        {
          type: 'docsVersionDropdown',
          position: 'right',
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              to: '/versions',
              label: 'All versions',
            },
          ],
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://pypi.org/project/mpegCoder',
          position: 'right',
          className: 'header-pypi-link',
          'aria-label': 'PyPI repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/',
            },
            {
              label: 'APIs',
              to: '/docs/apis/',
            },
          ],
        },
        {
          title: 'Contact the author',
          items: [
            {
              label: 'Website',
              href: 'https://cainmagi.github.io/',
            },
            {
              label: 'Email',
              href: 'mailto:cainmagi@gmail.com',
            },
            {
              label: 'Github',
              href: 'https://github.com/cainmagi',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'UH MODAL Lib',
              href: 'https://modal.ece.uh.edu/',
            },
            {
              label: 'University of Houston',
              href: 'https://www.uh.edu/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} mpegCoder, Yuchen Jin. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
    hideableSidebar: true,
    gtag: {
      trackingID: 'G-VY4XPTJXNM',
      anonymizeIP: true,
    },
    algolia: {
      apiKey: '860fac8f443a1afd20afd7960cec9441',
      indexName: 'mpegcoder',
      // APP id
      appId: 'BH4D9OD16A',
      // Optional: make the search sensitive to sub-routing.
      contextualSearch: true,
      // Optional: Algolia search parameters
      searchParameters: { 'facetFilters': ["type:content"] },
      debug: false
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/cainmagi/FFmpeg-Encoder-Decoder-for-Python/edit/docs/',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          lastVersion: "3.1.0",
          onlyIncludeVersions: [
            'current', ...versions.slice(0, 2)
          ],
          versions: {
            current: {
              label: "Next",
            }
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
      integrity:
        'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
      crossorigin: 'anonymous',
    },
  ],
};
