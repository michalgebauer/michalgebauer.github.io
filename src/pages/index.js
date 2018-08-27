import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import { PageWrapper } from '../components/PageWrapper';
import './index.css';

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  console.log(data.meImage.edges);
  return (
    <PageWrapper pageType="Blogs">
      <div className="container" style={{ paddingTop: '60px', paddingBottom: '50px' }}>
        <div className="row">
          {posts.filter(post => post.node.frontmatter.type === 'blog').map(({ node: post }) => {
            return (
              <div key={post.id} className="blog-card col-md-6">
                <div>
                  {post.frontmatter.image && (
                    <Img
                      className="blog-thumbnail"
                      alt={post.frontmatter.title}
                      sizes={post.frontmatter.image.childImageSharp.sizes}
                    />
                  )}
                </div>
                <div>
                  <h2>
                    <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                  </h2>
                  <div className="blog-meta">
                    <div className="me-image">
                      <Img sizes={data.meImage.sizes} />
                    </div>
                    <Link to="/about">Michal Gebauer</Link> | {post.frontmatter.date}
                  </div>
                  <p>{post.excerpt}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {posts &&
        posts.length < 4 && (
          <div className="no-more-posts">
            <div className="container">
              <div className="col-sm-1 col-xs-3">
                <i className="far fa-frown fa-2x" />
              </div>
              <div className="col-sm-11 col-xs-9">
                Yest, that's it. <br /> But come back soon, since I am right now working on new post which might be
                interesting for you ;-)
              </div>
            </div>
          </div>
        )}
    </PageWrapper>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    meImage: imageSharp(id: { regex: "/me-cut-small.png/" }) {
      sizes(maxWidth: 300) {
        ...GatsbyImageSharpSizes
      }
    }
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            label
            type
            image {
              publicURL
              childImageSharp {
                sizes(maxWidth: 1240) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  }
`;
