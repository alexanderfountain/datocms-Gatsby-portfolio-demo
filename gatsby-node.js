const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
exports.createPages = async ({ actions, graphql, reporter }, options) => {
  // const { createPage } = actions;

  const result = await graphql(`
    {
      venue: allDatoCmsVenue {
        nodes {
          slug
        }
      }
      blog: allDatoCmsBlog {
        nodes {
          slug
        }
      }
    }
  `);

  console.log(result.data.venues);

  result.data.venue.nodes.forEach(node => {
    const id = node.id;
    actions.createPage({
      path: `venue/${node.slug}`,
      component: path.resolve(`./src/templates/venue.js`),
      context: {
        slug: node.slug
      }
    });
  });

  result.data.blog.nodes.forEach(node => {
    const id = node.id;
    actions.createPage({
      path: `blog/${node.slug}`,
      component: path.resolve(`./src/templates/blog.js`),
      context: {
        slug: node.slug
      }
    });
  });
};
