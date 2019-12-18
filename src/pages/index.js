import React from "react";
import { Link, graphql } from "gatsby";
import Masonry from "react-masonry-component";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { Fade } from 'react-slideshow-image';

 
const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true,
}

const IndexPage = ({ data }) => (
  <Layout>
  <Fade {...fadeProperties}>
  {data.home.nodes[0].homeHeroSlideshow.map((slide, index) => (
    <div>
    <img src={slide.url} key={index} />
    </div>
  ))}
  </Fade>
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
      }
    }
  }
  }
`;
