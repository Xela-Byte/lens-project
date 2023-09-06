import { Link } from "react-router-dom";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import { Article } from "../utils/model";

export default function LatestNewsSection({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 md:mt-6 mt-[12px]">
      {articles.map((article) => {
        const imageUrl = getStrapiMedia(
          article.attributes.cover.data?.attributes.url
        );

        const category = article.attributes.category.data?.attributes;

        return (
          <Link
            to={`/${category?.slug}/${article.attributes.slug}`}
            key={article.id}
            className="w-full 2xl:h-[361px] xl:h-[405px] h-[335px] bg-white rounded-xl xl:p-[16px] p-[8px]"
          >

            <div className="w-full 2xl:h-[285px] xl:h-[331px] h-[279px] overflow-hidden text-container border-b-2 ">

              {imageUrl && (
                <>
                  <img
                    alt="presentation"
                    width="240"
                    height="240"
                    className="object-cover sm:w-full w-[342px] h-[187px] bg-[#cccccc] rounded-xl"
                    src={imageUrl}
                  />
                </>
              )}
              <h3 className="text-[14px] leading-[22px] font-medium mt-3">
                {article.attributes.title}
              </h3>
              <p className="text-[13px] leading-[22px] mt-3">
                {article.attributes.description}
              </p>
            </div>
            <div className="h-[50px] flex justify-center items-center">
              <div className="mr-auto">
                <p className="text-[12px]">
                  {formatDate(article.attributes.updatedAt)}
                </p>
              </div>
              <div className="ml-auto bg-[#EAF4FE] rounded-lg px-2">
                {category && (
                  <p className="text-[#027EF4] text-[14px]">{category.name}</p>
                )}
              </div>
            </div>
          </Link>
        );
      })}

      {children && children}
    </div>
  );
}
