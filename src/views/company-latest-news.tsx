import { Link } from "react-router-dom";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";
import { Article } from "../utils/model";
import { BsDatabaseX as NoDataIcon } from "react-icons/bs";

export default function CompanyLatesNewsSection({
  data: articles,
  children,
}: {
  data: Article[];
  children?: React.ReactNode;
}) {
  if (!articles || articles.length === 0) {
    return <div className="w-full h-[450px] flex justify-center items-center">
      <div className="">
        <NoDataIcon className="ml-auto mr-auto color-[#333333]" color={'#888888'} size={100} />
        <p className="text-center center text-[#888888] text-[18px] ml-1">There is no article.</p>
      </div>
    </div>;
  }

  return (
    <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 md:mt-6 mt-[16px]">
      {articles.map((article) => {
        const imageUrl = getStrapiMedia(
          article.attributes.cover.data?.attributes.url
        );

        const company = article.attributes.company.data?.attributes;

        return (
          <Link
            to={`/${company?.slug}/${article.attributes.slug}`}
            key={article.id}
            className="w-full 2xl:h-[361px] xl:h-[405px] h-[335px] bg-white rounded-xl xl:p-[16px] p-[8px]"
          >

            <div className="w-full 2xl:h-[285px] xl:h-[329px] h-[279px] overflow-hidden text-container border-b-2 ">

              {imageUrl && (
                <img
                  alt="presentation"
                  width="240"
                  height="240"
                  className="object-cover sm:w-full w-[358px] h-[187px] bg-[#cccccc] rounded-xl"
                  src={imageUrl}

                />
              )}
              <h3 className="md:text-[14px] text-[12px] leading-[22px] font-medium md:mt-3 mt-[8px]">
                {article.attributes.title}
              </h3>
              <p className="md:text-[13px] text-[12px] leading-[22px] md:mt-3 mt-px[4px]">
                {article.attributes.description}
              </p>
            </div>
            <div className="h-[50px] flex justify-center items-center ">
              <div className="mr-auto">
                <p className="text-[12px]">
                  {formatDate(article.attributes.updatedAt)}
                </p>
              </div>
              <div className="ml-auto bg-[#EAF4FE] rounded-lg px-1">
                {company && (
                  <p className="text-[#027EF4] text-[14px]">{company.name}</p>
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
