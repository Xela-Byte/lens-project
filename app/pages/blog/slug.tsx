import { useEffect, useState } from "react";
import { fetchAPI } from "@/utils/fetch-api";
import Post from "@/views/post";
import { ArticleSkeleton } from "@/components/Skeleton";
import { useParams } from "next/navigation";

async function getPostBySlug(slug: string | string[]) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: "*",
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getSimilarPostsBySlug(
  collectionType: string,
  slug: string | string[],
  postSlug: string | string[],
  sortBy: string,
  start: number,
  limit: number
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const collection =
    collectionType === "company"
      ? {
          company: {
            slug: {
              $eq: slug,
            },
          },
        }
      : {
          category: {
            slug: {
              $eq: slug,
            },
          },
        };

  const sort = sortBy === "rating" ? { rating: "desc" } : { createdAt: "desc" };
  const urlParamsObject = {
    filters: {
      ...collection,
      slug: {
        $ne: postSlug,
      },
    },
    sort,
    populate: "*",
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

async function getMetaData(slug: string) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const urlParamsObject = {
    filters: { slug },
    populate: { seo: { populate: "*" } },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response.data;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<any> {
  const meta = await getMetaData(params.slug);
  const metadata = meta[0].attributes.seo;

  return {
    title: metadata.metaTitle,
    description: metadata.metaDescription,
  };
}

export default function PostRoute() {
  const { slug } = useParams();
  const [data, setData] = useState<any>({});
  const [latestNews, setLatestNews] = useState<any>({});
  const [popularNews, setPopularNews] = useState<any>({});

  useEffect(() => {
    (async () => {
      if (!slug) {
        return <></>;
      }
      const data = await getPostBySlug(slug);
      setData(data);
      const collectionType = data.data[0].attributes.company.data
        ? "company"
        : "category";
      const collectionSlug = data.data[0].attributes.company.data
        ? data.data[0]?.attributes.company.data?.attributes.slug
        : data.data[0]?.attributes.category.data?.attributes.slug;
      const limit = Number(process.env.REACT_APP_PUBLIC_BLOG_LIMIT);
      const latestNews = await getSimilarPostsBySlug(
        collectionType,
        collectionSlug,
        slug,
        "createdAt",
        0,
        limit
      );
      setLatestNews(latestNews);
      const popularNews = await getSimilarPostsBySlug(
        collectionType,
        collectionSlug,
        slug,
        "rating",
        0,
        limit
      );
      setPopularNews(popularNews);
    })();
  }, [slug]);
  if (!data.data || data.data.length === 0) return <ArticleSkeleton />;
  else
    return (
      <Post
        data={data.data[0]}
        latestNews={latestNews.data}
        popularNews={popularNews.data}
      />
    );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(
    path,
    {
      populate: ["category"],
    },
    options
  );

  return articleResponse.data.map(
    (article: {
      attributes: {
        slug: string;
        category: {
          slug: string;
        };
      };
    }) => ({ slug: article.attributes.slug, category: article.attributes.slug })
  );
}
