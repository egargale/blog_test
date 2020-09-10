// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Casper',
  siteDescription: 'an awesome Gridsome starter kit',
  siteUrl: 'http://localhost:8080',
  plugins: [
    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          whitelist: ['svg-inline--fa', 'table', 'table-striped', 'table-bordered', 'table-hover', 'table-sm'],
          whitelistPatterns: [/fa-$/, /blockquote$/, /code$/, /pre$/, /table$/, /table-$/]
        },
        presetEnvConfig: {},
        shouldPurge: false,
        shouldImport: true,
        shouldTimeTravel: true,
        shouldPurgeUnusedKeyframes: true,
      }
    }, 
    {
      use: 'gridsome-source-static-meta',
      options: {
        path: 'content/site/*.json'
      }
    }, 
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Author',
        path: './content/author/*.md'
      }
    }, 
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Blog',
        path: './content/blog/**/*.md',
        refs: {
          author: 'Author',
          tags: {
            typeName: 'Tag',
            create: true
          },
          category: {
            typeName: 'Category',
            create: true
          }
        }
      }
    },
    // {
    //   use: 'gridsome-plugin-rss',
    //   options: {
    //     contentTypeName: 'Blog',
    //     latest: true,
    //     maxItems: 1000,
    //     feedOptions: {
    //       title: 'Your Website Name RSS',
    //       feed_url: 'https://yourwebsite.com/rss.xml',
    //       site_url: 'https://yourwebsite.com'
    //     },
    //     feedItemOptions: post => ({
    //       title: post.title,
    //       description: post.description,
    //       url: 'https://yourwebsite.com/' + post.slug
    //     }),
    //     output: {
    //       dir: './static',
    //       name: 'rss.xml'
    //     }
    //   }
    // }
    {
      use: 'gridsome-plugin-feed',
      options: {
        // Required: array of `GraphQL` type names you wish to include
        contentTypes: ['Blog'],
        // Optional: any properties you wish to set for `Feed()` constructor
        // See https://www.npmjs.com/package/feed#example for available properties
        feedOptions: {
          title: 'My Awesome Blog Feed',
          description: 'Best blog feed evah.'
        },
        // === All options after this point show their default values ===
        // Optional; opt into which feeds you wish to generate, and set their output path
        rss: {
          enabled: true,
          output: '/rss.xml'
        },
        // Optional: the maximum number of items to include in your feed
        maxItems: 25,
        filterNodes: (node) => true,
        nodeToFeedItem: (node) => ({
          title: node.title,
          content: node.content
        })
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        '@noxify/gridsome-remark-table-align',
        ['@noxify/gridsome-remark-classes', {
          'table': 'table table-striped',
          'tableCell[align=center]': 'text-center',
          'tableCell[align=right]': 'text-right'
        }]
      ],
      config: {
        footnotes: true
      }
    }
  },
  templates: {
    Blog: [{
      path: '/blog/:title'
    }],
    Category: [{
      path: '/category/:title',
      component: '~/templates/Category.vue'
    }],
    Author: [{
      path: '/author/:name',
      component: '~/templates/Author.vue'
    }],
    Tag: [{
      path: '/tags/:title',
      component: '~/templates/Tag.vue'
    }],
  }
}
