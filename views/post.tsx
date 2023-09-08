import Head from "next/head";
import Link from "next/link";
import { BsArrowUpRight as ArrowTRIcon } from "react-icons/bs";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import Category from "../components/Category";
import SideSimilarArticles from "../components/SideSimilarArticles";
import { getStrapiMedia } from "../utils/api-helpers";
import { Article } from "../utils/model";
import { postRenderer } from "../utils/post-renderer";

export default function Post({
  data,
  latestNews,
  popularNews,
}: {
  data: Article;
  latestNews?: Article[];
  popularNews?: Article[];
}) {
  function convertDateToCustomFormat(isoDate: string): string {
    const dateObj = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZoneName: "short",
    };
    options.timeZone = "America/New_York";
    const customDate = dateObj.toLocaleString("en-US", options);
    return customDate;
  }

  const { title, description, publishedAt, cover } = data.attributes;

  const imageUrl = getStrapiMedia(cover.data?.attributes.url);

  return (
    <div className="darok:bg-black 2xl:max-w-[1720px] xl:max-w-[1240px] sm:max-w-full max-w-[358px] mx-auto px-0 sm:px-6 darok:text-gray-100 min-h-screen">
      <Head>
        <title>{data.attributes.seo.metaTitle}</title>
        <meta
          name="description"
          content={data.attributes.seo.metaDescription}
        />
      </Head>
      <div className="w-full flex items-center mt-[24px]">
        <Link href={"/"} className="text-[#717172] text-[14px] font-semibold">
          Home
        </Link>
        <div className="w-[18px] h-[18px] flex justify-center items-center mx-4">
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.08784 4.754C7.05017 4.79267 6.90794 4.958 6.77545 5.094C5.9987 5.94933 3.9724 7.34933 2.91184 7.77667C2.75077 7.84533 2.34356 7.99067 2.126 8C1.91752 8 1.71879 7.952 1.52915 7.85467C1.29274 7.71867 1.1031 7.50467 0.999191 7.252C0.932297 7.07667 0.828384 6.552 0.828384 6.54267C0.724471 5.96867 0.667319 5.036 0.667319 4.00533C0.667318 3.02333 0.72447 2.12867 0.809549 1.546C0.819291 1.53667 0.923204 0.884667 1.03686 0.661334C1.24533 0.253334 1.65254 2.48344e-07 2.08833 2.29295e-07L2.126 2.27648e-07C2.40981 0.0100002 3.00666 0.263334 3.00666 0.272667C4.01007 0.700667 5.98961 2.032 6.78519 2.91667C6.78519 2.91667 7.00926 3.144 7.10667 3.286C7.25865 3.49 7.33398 3.74267 7.33398 3.99533C7.33398 4.27733 7.24891 4.54 7.08784 4.754Z"
              fill="#717172"
            />
          </svg>
        </div>
        <p className="text-[#027EF4] text-[14px] font-normal">{title}</p>
      </div>
      <div className="w-full grid grid-cols-12 gap-[24px] mt-[24px]">
        <div className="w-full h-auto lg:col-span-8 col-span-full">
          <div className="w-full md:flex md:justify-between block items-center">
            <p className="text-[14px] text-[#717172]">
              Published:{" "}
              <span className="text-[#101011]">
                {convertDateToCustomFormat(publishedAt)}
              </span>
            </p>

            <div className="flex ">
              {data.attributes.category.data && (
                <div className=" bg-[#EAF4FE]  rounded-lg md:p-2 py-2">
                  <p className="text-[#027EF4] text-[14px]">
                    {data.attributes.category.data.attributes.name}
                  </p>
                </div>
              )}
              <a
                rel="noopener noreferrer"
                href="/"
                className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] bg-[#ffffff] cursor-pointer">
                <FaFacebookF color="#027EF4" />
              </a>
              <a
                rel="noopener noreferrer"
                href="/"
                className="flex items-center justify-center w-[36px] h-[36px] rounded-[8px] bg-[#ffffff] ml-[16px] cursor-pointer">
                <FaTwitter color="#02C8F4" />
              </a>
            </div>
          </div>
          <div className="mt-[16px]">
            <h1 className="leading-tight text-[22px] md:text-[26px] font-semibold ">
              {title}
            </h1>
            <p className="mt-[16px] text-[14px]">{description}</p>
          </div>
          <div className="w-full h-auto rounded-xl flex mt-[16px]">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="article-cover"
                width={400}
                height={400}
                className="sm:w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
          {!data.attributes.company.data! || imageUrl ? (
            <div className="w-full h-[24px]"></div>
          ) : (
            <div className="border-[##EBEBEB] border-t-[1px] border-b-[1px] py-[24px] my-[24px]">
              <h1 className="text-[26px] font-semibold">Referenced Symbols</h1>
              <div className="mt-[16px] gap-[32px] flex">
                {/* <div className="flex justify-center items-center">
                  <p className="text-[14px] leading-[22px] font-normal color-[#101011]">IBEX</p>
                </div> */}
                <div className="flex justify-center items-center">
                  <Link
                    href={`/${data.attributes.company.data.attributes.slug}`}
                    className="text-[14px] leading-[22px] font-normal color-[#101011]">
                    {data.attributes.company.data.attributes.slug}
                  </Link>
                  <div className="flex items-center rounded-[4px] bg-[#D2F8CC] px-[4px] ml-2">
                    <p className="text-[14px] text-[#13B28C] font-semibold ml-auto">
                      +0.7%
                    </p>
                    <ArrowTRIcon className="ml-1" color="#13B28C" />
                  </div>
                </div>
              </div>
            </div>
          )}
          {imageUrl ? (
            <></>
          ) : (
            <article className="p-8 darok:bg-black darok:text-gray-50 bg-white rounded-xl ">
              <div className="darok:text-gray-100 article-content">
                {data.attributes.blocks.map((section: any, index: number) =>
                  postRenderer(section, index)
                )}
              </div>
            </article>
          )}
        </div>
        {latestNews && (
          <div className="w-full h-auto lg:col-span-4 lg:block hidden">
            <h1 className="text-[22px] font-medium ">Similar Articles</h1>
            <SideSimilarArticles data={latestNews} />
            {popularNews && !imageUrl ? (
              <div className="w-full h-auto mt-12">
                <h1 className="text-[22px] font-medium">Similar Articles</h1>
                <SideSimilarArticles data={popularNews} />
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      {imageUrl && data.attributes.company.data && (
        <div className="border-[##EBEBEB] border-t-[1px] border-b-[1px] py-[24px] my-[24px]">
          <h1 className="text-[26px] font-semibold">Referenced Symbols</h1>
          <div className="mt-[16px] gap-[32px] flex">
            <div className="flex justify-center items-center">
              <Link
                href={`/${data.attributes.company.data.attributes.slug}`}
                className="text-[14px] leading-[22px] font-normal color-[#101011]">
                {data.attributes.company.data.attributes.slug}
              </Link>
              <div className="flex items-center rounded-[4px] bg-[#D2F8CC] px-[4px] ml-2">
                <p className="text-[14px] text-[#13B28C] font-semibold ml-auto">
                  +0.7%
                </p>
                <ArrowTRIcon className="ml-1" color="#13B28C" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full grid grid-cols-12 gap-[24px]">
        <div className="w-full h-auto col-span-full lg:col-span-8">
          {imageUrl ? (
            <>
              <article className=" darok:bg-black darok:text-gray-50 bg-white rounded-xl ">
                <div className="darok:text-gray-100 article-content">
                  {data.attributes.blocks.map((section: any, index: number) =>
                    postRenderer(section, index)
                  )}
                </div>
              </article>
            </>
          ) : (
            <></>
          )}
          <div className="mt-20 bg-black w-full lg:h-[166px] h-[252px] rounded-xl justify-center items-center relative p-[32px]">
            <img
              className="lg:h-[166px] h-[252px] w-auto absolute top-0 right-[20%]"
              src="/vector-300.svg"
              alt="postIcon"
            />
            <img
              className="lg:h-[166px] h-[252px] w-auto absolute bottom-0 right-0"
              src="/vector-301.svg"
              alt="postIcon"
            />
            <div className=" w-full z-10">
              <div className="w-full max-md:pl-[20px]">
                <h1 className="text-[36px] leading-[44px] font-semibold text-white">
                  Back to 2055
                </h1>
                <p className="text-white text-[18px] leading-[26px] font-normal lg:mt-[32px] mt-[90px]">
                  Meeting 1.5 C - it’s not about the destination, it’s about the
                  speed
                </p>
              </div>
            </div>
            <div className=" w-full absolute top-[95px] left-[-1px] lg:top-[50px] lg:left-[60%]  z-10">
              <div className=" flex">
                <button className="bg-[#027EF4] text-white py-[16px] px-[12px] rounded-lg text-[14px] font-semibold">
                  Explore The Newest Product..
                </button>
              </div>
            </div>
          </div>
        </div>
        {imageUrl && popularNews && (
          <div className="w-full h-auto lg:col-span-4 lg:block hidden">
            <h1 className="text-[22px] font-medium">Similar Articles</h1>
            <SideSimilarArticles data={popularNews} />
          </div>
        )}
      </div>

      <Category />
    </div>
  );
}
