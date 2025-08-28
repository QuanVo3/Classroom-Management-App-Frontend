import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.API_BASE_URL}/news`);
  const data = await res.json();

  const paths = data?.map((post: any) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking", // hoặc "true" nếu muốn show loading
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug;

  try {
    const res = await fetch(
      `${process.env.API_BASE_URL}/news/${encodeURIComponent(slug as string)}`
    );

    if (!res.ok) {
      return { notFound: true };
    }

    const post = await res.json();

    return {
      props: { post },
      revalidate: 60, // ISR: revalidate sau mỗi 60 giây
    };
  } catch (error) {
    return { notFound: true };
  }
};

interface CapitalizeFirstLetter {
  (str: string): string;
}

export const capitalizeFirstLetter: CapitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
