import { Link, useNavigate } from "react-router-dom";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import { Article } from "../utils/model";

export default function SideSimilarArticles({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  return (
    <div className="w-full grid grid-cols-1 gap-5 mt-6">
      {articles.map((article) => {
        const imageUrl = getStrapiMedia(
          article.attributes.cover.data?.attributes.url
        );

        const category = article.attributes.category.data?.attributes;
        const company = article.attributes.company.data?.attributes;
        const toLink = category ? `/${category?.slug}/${article.attributes.slug}` : `/${company?.slug}/${article.attributes.slug}`

        return (
          <Link
            to={toLink}
            key={article.id}
            className="w-full h-[98px] flex mb-[32px] cursor-pointer"
          >
            {imageUrl ? (
              <img

                alt="presentation"
                width="240"
                height="240"
                className="object-cover w-[116px] h-[98px] min-w-[116px] min-h-[98px] bg-[#cccccc] rounded-[8px] mr-[16px]"
                src={imageUrl}

              />
            ) : <div className="min-w-[116px] min-h-[98px] rounded-[8px] bg-[#cccccc] mr-[16px]"></div>}
            <div className="w-full relative">
              <p className="text-[14px] font-semibold truncate h-[42px] w-full whitespace-normal ">

                {article.attributes.title}
              </p>
              <div className="w-full mt-5 flex items-center">
                <p className="text-[14px] font-normal">{formatDate(article.attributes.updatedAt)}</p>
                <p className="text-[14px] font-medium text-[#027EF4] bg-[#EAF4FE] px-[8px] py-[2px] rounded-[40px] ml-3 capitalize">
                  {category && (
                    <p className="text-[#027EF4] text-[14px]">{category.name}</p>
                  )}
                </p>
              </div>
            </div>
          </Link>
        );
      })}

      {children && children}
    </div>
  );
}
