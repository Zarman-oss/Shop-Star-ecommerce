import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="description" content={keywords} />
      </Helmet>
    </>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Shop Star',
  description: 'We sell the best products for less money',
  keywords: 'Electronics, mobile phones, headphones',
};
export default Meta;
