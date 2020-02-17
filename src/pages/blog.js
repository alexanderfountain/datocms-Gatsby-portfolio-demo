import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { Fade } from "react-slideshow-image";
import BackgroundImage from "gatsby-background-image";

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: false,
  arrows: false
};

const BlogPage = ({ data }) => (
  <div>
    <div className="home-slide">
      <Fade {...fadeProperties}>
        {data.home.nodes[0].homeHeroSlideshow.map((slide, index) => (
          <div className="each-slide">
            <BackgroundImage
              className="slide"
              fluid={slide.fluid}
            ></BackgroundImage>
          </div>
        ))}
      </Fade>
    </div>
    <Layout>
      <h2 className="venues-title">Blog Posts</h2>
      <Masonry className="showcase">
        {data.venue.edges.map(({ node: venue }) => (
          <div key={venue.id} className="showcase__item">
            <figure className="card">
              <Link to={`/blog/${venue.slug}`} className="card__image">
                <Img fluid={venue.coverImage.fluid} />
              </Link>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/blog/${venue.slug}`}>{venue.title}</Link>
                </h6>
                <div className="card__description">
                  <p>{venue.excerpt}</p>
                </div>
              </figcaption>
            </figure>
          </div>
        ))}
      </Masonry>
    </Layout>
  </div>
);

export default BlogPage;

export const query = graphql`
  query BlogsQuery {
    venue: allDatoCmsBlog(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          id
          title
          slug
          excerpt
          coverImage {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
    home: allDatoCmsHome {
      nodes {
        homeHeroSlideshow {
          url
          fluid(maxWidth: 1920) {
            base64
            tracedSVG
            aspectRatio
            width
            height
            src
            srcSet
            sizes
          }
        }
      }
    }
  }
`;
