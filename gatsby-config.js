require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: `My Lowcountry Venue`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: "d1a486e262d911adc2c4031d15ad2d" //process.env.DATO_API_TOKEN
      }
    }
  ]
};
