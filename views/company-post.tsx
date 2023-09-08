import { formatDate, getStrapiMedia } from "../utils/api-helpers";
import { postRenderer } from "../utils/post-renderer";
import { CgWebsite } from "react-icons/cg";
import {
  FaDiscord,
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    authorsBio: {
      data: {
        attributes: {
          name: string;
          avatar: {
            data: {
              attributes: {
                url: string;
              };
            };
          };
        };
      };
    };
    blocks: any[];
    publishedAt: string;
  };
}

export default function CompanyPost({ data }: { data: Article }) {
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

  const { title, description, publishedAt, cover, authorsBio } =
    data.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);

  return (
    <div className="darok:bg-black container mx-auto px-0 sm:px-6 darok:text-gray-100 min-h-screen">
      <div className="w-full grid grid-cols-4 gap-5 mt-6">
        <div className="w-full h-auto col-span-3">
          <div className="w-full h-[120px] flex items-center">
            <Link
              href={"/about"}
              className="text-[#717172] text-[18px] font-medium">
              Portfolio
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
            <p className="text-[#027EF4] text-[18px] font-medium">{title}</p>
          </div>
          <div className="w-full h-[120px] mt-2 flex items-center">
            <p className="text-[18px] text-[#717172]">
              Published:{" "}
              <span className="text-[#101011]">
                {convertDateToCustomFormat(publishedAt)}
              </span>
            </p>
            {/* <div className="flex justify-start pt-6 space-x-4 lg:pt-5 lg:col-end-13">
              <div className="flex justify-start pt-6 space-x-4 lg:pt-5 lg:col-end-13">
                <a
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-md darok:bg-violet-400 darok:text-gray-900 bg-[#FAFAFA]"
                >
                  <FaFacebookF />
                </a>
              </div>
            </div> */}
          </div>
          <div className="mb-7">
            <h1 className="leading-tight text-[40px] font-bold ">{title}</h1>

            <p className="my-7">{description}</p>
          </div>
          <div className="w-full h-auto rounded-xl flex">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="article cover image"
                width={400}
                height={400}
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>
          <article className="p-8 darok:bg-black darok:text-gray-50 bg-white rounded-xl my-8">
            <div className="darok:text-gray-100">
              {data.attributes.blocks.map((section: any, index: number) =>
                postRenderer(section, index)
              )}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
