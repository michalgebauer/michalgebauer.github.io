import React from 'react';
import Helmet from 'react-helmet';
import { PageWrapper } from '../components/PageWrapper';
import Img from 'gatsby-image';

export default function Template({ data }) {
  const { markdownRemark: post } = data;
  return (
    <PageWrapper pageType={post.frontmatter.path === '/about' ? 'About' : 'Blog'}>
      {post.frontmatter.image && (
        <div style={{ position: 'relative' }}>
          <Img title="About" alt="About" sizes={post.frontmatter.image.childImageSharp.sizes} />
          <h1 style={{ position: 'absolute', top: '20px', paddingLeft: '15px', color: '#fff' }}>
            {post.frontmatter.title}
          </h1>
        </div>
      )}
      <div className="container">
        <h1 style={{ paddingTop: '25px', paddingBottom: '25px' }}>{post.frontmatter.title}</h1>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </PageWrapper>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        label
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
`;
