import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import { PageWrapper } from '../components/PageWrapper';
import './index.css';

export default function Index({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
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
                  <div className="blog-meta">{post.frontmatter.date}</div>
                  <p>{post.excerpt}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageWrapper>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
