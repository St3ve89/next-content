// we need to generate the static pages for these routes so
// that when we visit one each one shows its own data for that recipe
// the way to do this in nextjs to use the get static path function inside the slug component
// this function is responsibel for finding out all of the paths or routes which will use this component
// as its page and then nextjs can generate a static page for each one of those paths at build time
import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export default function RecipeDetails({ recipe }) {
  console.log({ recipe });
  return <div>Recipe Details</div>;
}

export const getStaticPaths = async () => {
  const res = await client.getEntries({
    content_type: 'recipe',
  });

  const paths = res.items.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: 'recipe',
    'fields.slug': params.slug,
  });

  return {
    props: {
      recipe: items[0],
    },
  };
};
