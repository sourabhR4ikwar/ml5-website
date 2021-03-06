import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

import Layout from "../components/Layout";
import Features from "../components/Features";
import Features2 from "../components/Features2";

export const HomePageTemplate = ({
  content,
  heading,
  subheading,
  mainpitch,
  acknowledgements,
  intro,
  model,
  team,
}) => (
  <div className="ml5Grid__container--homePage">
    <section
      className="circles-1"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="home__overlay" />
      <Link style={{ zIndex: "9" }} to="">
        {/* heading */}
        <h2
          style={{
            width: "100%",
            maxWidth: "680px",
            fontSize: "4rem",
            color: "#a15ffb",
            backgroundColor: "white",
            textAlign: "center",
          }}
          className="home__heading"
        >
          {heading}
        </h2>
        {/* subheading */}
        <p
          style={{
            width: "100%",
            maxWidth: "680px",
            fontSize: "1.5rem",
            color: "#a15ffb",
            backgroundColor: "white",
            textAlign: "center",
          }}
          className="home__subheading"
        >
          {subheading}
        </p>
      </Link>
    </section>

    <section className="home__container home__gridContainer">
      <div className="home__gridItem--6out12">
        <h2 className="Button__wrapper">
          <Link className="Button" to="/getting-started">
            Get started with ml5.js
          </Link>
        </h2>
        <h2 className="home__pitchTitle">{mainpitch.title}</h2>
        <p className="home__pitchDescription">{mainpitch.description}</p>
      </div>
    </section>

    <section className="home__container home__gridContainer">
      <div className="home__gridItem--10out12 home__blurbs">
        <Features gridItems={intro.blurbs} />
      </div>
    </section>

    <section className="home__update home__gridContainer">
      <div className="home__gridItem--6out12">
        <div
          className="home__updateContent"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    </section>

    <section className="home__container home__model">
      <h2>{model.heading}</h2>
      <Features gridItems={model.blurbs} />
    </section>

    <section className="home__team">
      <h2>{team.heading}</h2>
      <div className="GridContainer">
        <div className="home__teamWrapper">
          <div className="home__teamHeadshot">
            <PreviewCompatibleImage imageInfo={team} />
          </div>
          <p>{team.profile}</p>
        </div>
      </div>
    </section>

    <section className="home__container home__acknowledgements">
      <h2>{acknowledgements.heading}</h2>
      <Features2 gridItems={acknowledgements.blurbs} />
    </section>
  </div>
);

HomePageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  mainpitch: PropTypes.object,
  acknowledgements: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
};

const HomePage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  const content = data.markdownRemark.html;

  return (
    <Layout>
      <HomePageTemplate
        content={content}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        acknowledgements={frontmatter.acknowledgements}
        intro={frontmatter.intro}
        model={frontmatter.model}
        team={frontmatter.team}
      />
    </Layout>
  );
};

HomePage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default HomePage;

export const pageQuery = graphql`
  query HomePageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "home-page" } }) {
      html
      frontmatter {
        heading
        subheading

        mainpitch {
          title
          description
        }

        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
        }

        model {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
        }

        acknowledgements {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
        }

        team {
          image {
            childImageSharp {
              fluid(maxWidth: 240, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          heading
          profile
        }
      }
    }
  }
`;
