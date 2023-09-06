import { useState, useCallback, useEffect } from "react";
import {
  FiArrowDownRight as ArrowDRShirtIcon,
  FiSearch as SearchIcon,
} from "react-icons/fi";
import { fetchAPI } from "../utils/fetch-api";
import { Meta, Category, Article } from "../utils/model";
import { getStrapiMedia } from "../utils/api-helpers";
import { Link } from "react-router-dom";

export default function CategorySection() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.REACT_APP_PUBLIC_STRAPI_API_TOKEN;
      const path = `/categories`;
      const urlParamsObject = {
        sort: { rating: "desc" },
        fields: ["name", "slug", "updatedAt"],
        populate: {
          articles: {
            cover: "*",
          },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };

      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      console.log("res", responseData);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }

      setMeta(responseData.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(0, Number(process.env.REACT_APP_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  function formatDate(timestamp: string): string {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(timestamp);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const month = date.getUTCMonth() + 1;

    const newMonth = months[Number(month - 1)];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear() % 100;

    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${newMonth} ${day}, 20${year}`;
  }

  return (
    <div className="md:mt-20 mt-[28px]">
      <div className="flex items-center">
        <h1 className="text-[#101011] text-[22px] font-medium">
          News Categories
        </h1>
        <ArrowDRShirtIcon size={32} className="ml-3" />
      </div>
      <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 mt-[16px]">
        {data.map(
          (c) =>
            c.attributes.articles.data.length > 0 && (
              <div className="w-full h-auto flex">
                <div className="w-full md:p-6">
                  <div className="flex items-center mb-[8px]">
                    <h1 className="text-[18px] font-medium capitalize">
                      {c.attributes.name}
                    </h1>
                    <ArrowDRShirtIcon size={18} className="ml-3" />
                  </div>
                  {c.attributes.articles.data.slice(0, 4).map((a) => (
                    <Link
                      to={`/${c.attributes.slug}/${a.attributes.slug}`}
                      className="w-full h-[98px] flex md:mb-[32px] mb-[8px]">
                      <ArticleImg slug={a.attributes.slug} />
                      <div className="w-full relative">
                        <p className="text-[14px] font-semibold truncate h-[42px] w-full whitespace-normal ">
                          {a.attributes.title}
                        </p>
                        <div className="w-full mt-5 flex items-center">
                          <p className="text-[14px] font-normal">
                            {formatDate(a.attributes.updatedAt)}
                          </p>
                          <p className="text-[14px] font-medium text-[#027EF4] bg-[#EAF4FE] px-[8px] py-[2px] rounded-[40px] ml-3 capitalize">
                            {c.attributes.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

const ArticleImg = ({ slug }: { slug: string }) => {
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchImg = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.REACT_APP_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        filters: { slug },
        populate: {
          cover: { fields: ["url"] },
        },
        pagination: {
          start: start,
          limit: limit,
        },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);

      if (start === 0) {
        setData(responseData.data);
      } else {
        setData((prevData: any[]) => [...prevData, ...responseData.data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImg(0, Number(process.env.REACT_APP_PUBLIC_BLOG_LIMIT));
  }, [fetchImg]);

  let imgUrl: string | null = "";

  if (data) {
    imgUrl = getStrapiMedia(data[0]?.attributes.cover.data?.attributes.url);
  } else if (!data) {
    <div className="min-w-[116px] min-h-[98px] rounded-[8px] bg-[#cccccc] mr-[16px]"></div>;
  }
  if (!imgUrl)
    return (
      <div className="min-w-[116px] min-h-[98px] rounded-[8px] bg-[#cccccc] mr-[16px]"></div>
    );

  return (
    <img
      alt="presentation"
      width="240"
      height="240"
      className="object-cover w-[116px] h-[98px] min-w-[116px] min-h-[98px] bg-[#cccccc] rounded-[8px] mr-[16px]"
      src={imgUrl}
    />
  );
};
