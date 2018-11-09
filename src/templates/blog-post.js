import React from 'react';
import { PageWrapper } from '../components/PageWrapper';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import './blog-post.css';
import { SharePanel } from '../components/SharePanel';
import Helmet from 'react-helmet';

export default function Template({ data }) {
  const { markdownRemark: post, site } = data;
  return (
    <div>
      <Helmet
        title={`${post.frontmatter.title} - mI3O blog`}
        meta={[
          { name: 'description', content: post.excerpt },
          { name: 'keywords', content: 'java, javascript, Spring, JEE, React, Typescript, ECMA' },
          { name: 'og:title', content: post.frontmatter.title },
          { name: 'twitter:title', content: post.frontmatter.title },
          { name: 'og:description', content: post.excerpt },
          { name: 'twitter:description', content: post.excerpt },
          {
            name: 'og:image',
            content: post.frontmatter.image ? site.siteMetadata.url + post.frontmatter.image.publicURL : ''
          },
          {
            name: 'twitter:image',
            content: post.frontmatter.image ? site.siteMetadata.url + post.frontmatter.image.publicURL : ''
          },
          { name: 'og:type', content: 'blog' },
          { name: 'twitter:card', content: 'summary' },
          { name: 'twitter:url', content: site.siteMetadata.url + post.frontmatter.path }
        ]}
      >
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({
          google_ad_client: "ca-pub-5691001381659710",
          enable_page_level_ads: true
        });`}
        </script>
      </Helmet>
      <PageWrapper pageType={post.frontmatter.path === '/about' ? 'About' : 'Blog'}>
        {post.frontmatter.image && (
          <div style={{ position: 'relative' }}>
            <Img sizes={post.frontmatter.image.childImageSharp.sizes} />
            <h1 className="image-heading hidden-xs">{post.frontmatter.title}</h1>
          </div>
        )}
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="BlogPost">
                <h1>{post.frontmatter.title}</h1>
                {post.frontmatter.type === 'blog' && (
                  <h4>
                    <div className="me-image">
                      <Img sizes={data.meImage.sizes} />
                    </div>
                    <Link to="/about">Michal Gebauer</Link> | {post.frontmatter.date}
                  </h4>
                )}
                <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
                {post.frontmatter.type === 'blog' && (
                  <div>
                    <SharePanel
                      title={post.frontmatter.title}
                      shareUrl={`${site.siteMetadata.url}${post.frontmatter.path}`}
                    />
                    <h4 style={{ marginTop: '40px' }}>My recent posts:</h4>
                    <div className="row">
                      {data.recentPosts.edges
                        .filter(
                          p => p.node.frontmatter.path !== post.frontmatter.path && p.node.frontmatter.type === 'blog'
                        )
                        .map(p => (
                          <div className="col-sm-6" key={p.node.frontmatter.path}>
                            <Link to={p.node.frontmatter.path}>
                              <h3>{p.node.frontmatter.title}</h3>
                            </Link>
                            <p>{p.node.excerpt}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {post.frontmatter.path === '/about' && (
              <div className="me-full-image col-md-4 col-xs-8">
                <Img sizes={data.meImageFull.sizes} />
              </div>
            )}
          </div>
        </div>
      </PageWrapper>
    </div>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    meImage: imageSharp(id: { regex: "/me-cut-small.png/" }) {
      sizes(maxWidth: 300) {
        ...GatsbyImageSharpSizes
      }
    }
    meImageFull: imageSharp(id: { regex: "/me-full.png/" }) {
      sizes(maxWidth: 300) {
        ...GatsbyImageSharpSizes
      }
    }
    site {
      siteMetadata {
        url
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
      limit: 4
    ) {
      edges {
        node {
          excerpt(pruneLength: 150)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            type
          }
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 100)
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
