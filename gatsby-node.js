const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsVenue {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsVenue.edges.map(({ node: venue }) => {
        createPage({
          path: `venue/${venue.slug}`,
          component: path.resolve(`./src/templates/venue.js`),
          context: {
            slug: venue.slug
          }
        });
      });
      resolve();
    });
  });
};
