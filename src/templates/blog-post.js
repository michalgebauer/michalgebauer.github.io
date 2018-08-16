import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import './blog-post.css';
import { SharePanel } from '../components/SharePanel';

export default function Template({ data }) {
  const { markdownRemark: post, site } = data;
  return (
    <PageWrapper pageType={post.frontmatter.path === '/about' ? 'About' : 'Blog'}>
      {post.frontmatter.image && (
        <div style={{ position: 'relative' }}>
          <Img title="About" alt="About" sizes={post.frontmatter.image.childImageSharp.sizes} />
          <h1 className="image-heading hidden-xs">{post.frontmatter.title}</h1>
        </div>
      )}
      <div className="BlogPost container">
        <h1>{post.frontmatter.title}</h1>
        {post.frontmatter.type === 'blog' && (
          <h4>
            <Link to="/about">Michal Gebauer</Link> | {post.frontmatter.date}
          </h4>
        )}
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.frontmatter.type === 'blog' && (
          <SharePanel title={post.frontmatter.title} shareUrl={`${site.siteMetadata.url}${post.frontmatter.path}`} />
        )}
      </div>
    </PageWrapper>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        url
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        label
        author
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
`;
