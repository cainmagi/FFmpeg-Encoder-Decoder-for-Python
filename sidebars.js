/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs: [
    'introduction',
    
    {
      type: 'category',
      label: 'Installation',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Installation',
        description:
          "Learn about how to install or compile mpegCoder.",
      },
      items: ['guides/install/pypi', 'guides/install/windows', 'guides/install/linux', 'guides/install/legacy'],
    },
    {
      type: 'category',
      label: 'Examples',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Examples',
        description:
          "Start the video processing or streaming with mpegCoder.",
      },
      items: ['guides/examples/decoding', 'guides/examples/transcoding', 'guides/examples/client', 'guides/examples/server'],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: false,
      link: {
        type: 'generated-index',
        title: 'Troubleshooting',
        description:
          "Tackle the issues and questions.",
      },
      items: ['troubleshooting/installation', 'troubleshooting/running', 'troubleshooting/qna'],
    },
    'changelog'
  ],
  apis: [
    'apis',
    `apis/readme`,
    `apis/setGlobal`,
    `apis/MpegDecoder`,
    `apis/MpegEncoder`,
    `apis/MpegClient`,
    `apis/MpegServer`
  ]

  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};
