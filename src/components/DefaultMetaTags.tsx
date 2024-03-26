import { Helmet } from 'react-helmet';

const DefaultMetaTags = () => {
  return (
    <Helmet>
      <title>Gil Banuelos</title>
      <meta name="description" content="Software Engineer + Tech Enthusiast" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://gil.technology/" />
      <meta property="og:title" content="Gil Banuelos" />
      <meta property="og:description" content="Software Engineer + Tech Enthusiast" />
      <meta property="og:image" content="https://gil.technology/logo.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://gil.technology/" />
      <meta property="twitter:title" content="Gil Banuelos" />
      <meta property="twitter:description" content="Software Engineer + Tech Enthusiast" />
      <meta property="twitter:image" content="https://gil.technology/logo.png" />
    </Helmet>
  );
};

export default DefaultMetaTags;