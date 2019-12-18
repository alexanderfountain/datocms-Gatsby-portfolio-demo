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

const IndexPage = ({ data }) => (
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
      <div className="overlay-container">
        <div className="overlay-top">Your next adventure awaits!</div>
        <div className="overlay">
          <p>
            Elephantnose fish bluegill longfin rice eel, skipping goby king of
            herring lefteye flounder. Glassfish, searobin ricefish deep sea
            anglerfish Arctic char North American darter.
          </p>
        </div>
      </div>
    </div>
    <Layout>
      <h2 className="venues-title">Our Venues</h2>
      <Masonry className="showcase">
        {data.venue.edges.map(({ node: venue }) => (
          <div key={venue.id} className="showcase__item">
            <figure className="card">
              <Link to={`/venue/${venue.slug}`} className="card__image">
                <Img fluid={venue.coverImage.fluid} />
              </Link>
              <figcaption className="card__caption">
                <h6 className="card__title">
                  <Link to={`/venue/${venue.slug}`}>{venue.title}</Link>
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

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    venue: allDatoCmsVenue(sort: { fields: [position], order: ASC }) {
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
