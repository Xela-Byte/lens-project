"use client";

import { fetchAPI } from "@/utils/fetch-api";
import { Company } from "@/utils/model";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiArrowDownRight as ArrowDRShirtIcon } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CompanyArticles from "./articles";

export default function CompanyPage() {
  const { slug } = useParams();
  const [data, setData] = useState<Company[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(
    async (start: number, limit: number) => {
      setLoading(true);
      try {
        const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
        const path = `/companies`;
        const urlParamsObject = {
          filters: { slug },
          populate: "*",
        };
        const options = { headers: { Authorization: `Bearer ${token}` } };
        const responseData = await fetchAPI(path, urlParamsObject, options);

        console.log("page limit:", limit);

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
    },
    [slug]
  );

  useEffect(() => {
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  if (isLoading)
    return (
      <main className="2xl:max-w-[1720px] xl:max-w-[1240px] max-w-[358px] mx-auto px-0 sm:px-6 darok:text-gray-100 h-auto animate-pulse">
        <div className="mt-12 h-[26px] bg-gray-200 rounded-xl w-[70%]" />
        <div className="mt-6 h-[20px] bg-gray-200 rounded-xl w-[60%]" />
        <div className="mt-[16px] bg-gray-200 rounded-xl h-[40px] w-[60%]" />
        <div className="mt-[24px] bg-gray-200 rounded-xl h-[288px] w-full" />
        <div className="mt-[24px] bg-gray-200 rounded-xl h-[389px] w-full" />
        <div className="mt-[24px] bg-gray-200 rounded-xl h-[600px] w-full" />
        <div className="mt-[24px] bg-gray-200 rounded-xl h-[600px] w-full" />
      </main>
    );

  return !data ? (
    <Skeleton />
  ) : (
    <>
      <main className="darok:bg-black 2xl:max-w-[1720px] xl:max-w-[1240px] sm:max-w-full max-w-[358px] mx-auto px-0 sm:px-6 darok:text-gray-100 min-h-screen">
        <Head>
          <title>{data[0].attributes.name}</title>
          <meta name="description" content={data[0].attributes.description} />
        </Head>
        <div className="mt-12">
          <div className="lg:flex w-full justify-between block items-end">
            <div className="uppercase lg:flex w-[60%] justify-between text-[26px] text-[rgb(16,16,17)] font-semibold">
              <div className="flex">
                {data[0].attributes.slug || <Skeleton />}
                <div className="ml-2 capitalize">
                  {data[0].attributes.name || <Skeleton />}
                </div>
              </div>
              <div className="flex my-[8px]">
                <div className="text-[18px] text-[#027EF4] mx-2">
                  {"$" + data[0].attributes.stockPrice || <Skeleton />}
                </div>
                <div className="text-[14px] text-[#13B28C] mx-2">
                  0.18 (+0.07%)
                </div>
              </div>
              <div className="text-[14px] my-[8px] text-[#101011] mx-2">
                Pre-Market: $271.90{" "}
                <span className="text-[#13B28C]">+2.11 (+0.78%)</span>
              </div>
              <div className="my-[8px] text-[14px] text-[#101011] mx-2">
                NASDAQ | $USD | 5:24 AM
              </div>
            </div>
            <button className="w-[150px] my-[8px] text-[#FFFFFF] bg-[#027EF4] py-[4px] px-[8px] mx-1.5 rounded-[8px] hover:bg-[#1a90ff]">
              Add To Watchlist
            </button>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center">
            <h1 className="uppercase text-[14px] text-[#101011] font-semibold">
              NASDAQ:
              <span className="capitalize font-normal mx-2">
                Motor vehicles & car bodies
              </span>
              <svg
                className="inline mx-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.22335 8.00441L7.22437 8.24047C7.23248 9.17679 7.28892 10.0122 7.38626 10.5416C7.38626 10.5511 7.49244 11.0762 7.56008 11.251C7.66626 11.5036 7.85826 11.718 8.09898 11.8539C8.29171 11.9508 8.49389 12 8.70552 12C8.87188 11.9923 9.14624 11.9086 9.34206 11.8384L9.50478 11.776C10.5826 11.3479 12.6429 9.94896 13.432 9.09345L13.4902 9.03365L13.7498 8.75344C13.9135 8.53901 14 8.27685 14 7.99486C14 7.74224 13.9229 7.48963 13.7687 7.28548C13.7226 7.21934 13.6482 7.13449 13.582 7.06279L13.3293 6.79826C12.4597 5.91715 10.5768 4.68122 9.60078 4.27171C9.60078 4.2629 8.99424 4.00955 8.70552 4H8.66697C8.22407 4 7.81026 4.25262 7.59862 4.66091C7.54081 4.77254 7.48535 4.99119 7.44317 5.18322L7.36735 5.5458C7.28081 6.12888 7.22335 7.02332 7.22335 8.00441ZM3.00217 6.98777C2.44872 6.98777 2 7.44087 2 7.99971C2 8.55855 2.44872 9.01164 3.00217 9.01164L5.46832 8.79354C5.9025 8.79354 6.25449 8.43885 6.25449 7.99971C6.25449 7.5613 5.9025 7.20587 5.46832 7.20587L3.00217 6.98777Z"
                  fill="#101011"
                />
              </svg>
              <span className="text-[14px] text-[#101011] mx-2 font-normal">
                Automobile Manufacturers
              </span>
              <svg
                className="inline mx-2"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.22335 8.00441L7.22437 8.24047C7.23248 9.17679 7.28892 10.0122 7.38626 10.5416C7.38626 10.5511 7.49244 11.0762 7.56008 11.251C7.66626 11.5036 7.85826 11.718 8.09898 11.8539C8.29171 11.9508 8.49389 12 8.70552 12C8.87188 11.9923 9.14624 11.9086 9.34206 11.8384L9.50478 11.776C10.5826 11.3479 12.6429 9.94896 13.432 9.09345L13.4902 9.03365L13.7498 8.75344C13.9135 8.53901 14 8.27685 14 7.99486C14 7.74224 13.9229 7.48963 13.7687 7.28548C13.7226 7.21934 13.6482 7.13449 13.582 7.06279L13.3293 6.79826C12.4597 5.91715 10.5768 4.68122 9.60078 4.27171C9.60078 4.2629 8.99424 4.00955 8.70552 4H8.66697C8.22407 4 7.81026 4.25262 7.59862 4.66091C7.54081 4.77254 7.48535 4.99119 7.44317 5.18322L7.36735 5.5458C7.28081 6.12888 7.22335 7.02332 7.22335 8.00441ZM3.00217 6.98777C2.44872 6.98777 2 7.44087 2 7.99971C2 8.55855 2.44872 9.01164 3.00217 9.01164L5.46832 8.79354C5.9025 8.79354 6.25449 8.43885 6.25449 7.99971C6.25449 7.5613 5.9025 7.20587 5.46832 7.20587L3.00217 6.98777Z"
                  fill="#101011"
                />
              </svg>
              <span className="text-[14px] text-[#101011] mx-2 font-normal">
                Auto/Tires/Trucks
              </span>
            </h1>
          </div>
        </div>

        <div className="w-full mt-6 grid grid-cols-3 lg:gap-5 gap-3">
          <div className="mb-4 border-b border-[#EBEBEB] col-span-3">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist">
              <li className="mx-4" role="presentation">
                <button
                  className="inline-block md:px-2 h-[38px] border-b-2 border-transparent rounded-t-lg text-[14px] hover:text-[#027EF4] hover:border-[#027EF4]"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false">
                  Summary
                </button>
              </li>
              <li className="mx-4" role="presentation">
                <button
                  className="inline-block md:px-2 h-[38px] border-b-2 border-transparent rounded-t-lg text-[14px] hover:text-[#027EF4] hover:border-[#027EF4]"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false">
                  Company KPis
                </button>
              </li>
              <li className="mx-4 sm:block hidden" role="presentation">
                <button
                  className="inline-block md:px-2 h-[38px] border-b-2 border-transparent rounded-t-lg text-[14px] hover:text-[#027EF4] hover:border-[#027EF4]"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false">
                  Financials
                </button>
              </li>
              <li className="mx-4 sm:block hidden" role="presentation">
                <button
                  className="inline-block md:px-2 h-[38px] border-b-2 border-transparent rounded-t-lg text-[14px] hover:text-[#027EF4] hover:border-[#027EF4]"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false">
                  Earning
                </button>
              </li>
              <li className="mx-4 sm:block hidden" role="presentation">
                <button
                  className="inline-block md:px-2 h-[38px] border-b-2 border-transparent rounded-t-lg text-[14px] hover:text-[#027EF4] hover:border-[#027EF4]"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false">
                  Dividends
                </button>
              </li>
              <li className="mx-4" role="presentation">
                <button
                  className="inline-block px-2 h-[38px] border-b-2 border-[#027EF4] bg-gradient-to-b from-[#027EF400] to-[#027EF433] rounded-t-lg text-[14px] text-[#027EF4]"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false">
                  Articles
                </button>
              </li>
              <li className="mx-4" role="presentation">
                <button
                  className="max-[845px]:hidden inline-block px-2 h-[38px] border-b-2 border-transparent rounded-t-lg text-[14px] hover:text-[#027EF4] hover:border-[#027EF4] "
                  id="settings-tab"
                  data-tabs-target="#settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false">
                  Insiders
                </button>
              </li>
            </ul>
          </div>
          <div className="w-full h-auto bg-white rounded-xl lg:p-6 p-2 col-span-3">
            <div className="w-full gap-[28px]">
              <h1 className="text-[22px] font-medium">Key Data</h1>
              <div className="w-full grid lg:grid-cols-3 min-[720px]:grid-cols-2 grid-cols-1 sm:gap-8 mt-2">
                <div className="w-full block ">
                  <div className="justify-between md:flex min-[720px]:block sm:flex py-[6px]">
                    <div className=" lg:w-full w-[150px] justify-between">
                      <p className="text-[14px] text-[#101011] ">Day Range</p>
                    </div>
                    <div className="flex gap-[16px]  items-center">
                      <p className="font-semibold text-[14px] py-2">$289.52</p>
                      <div className="mt-[-10px]">
                        <svg
                          className="hidden 2xl:flex"
                          width="223"
                          height="33"
                          viewBox="0 0 223 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_741_15413)">
                            <mask id="path-2-inside-1_741_15413" fill="white">
                              <path d="M0 9H55.75V33H0V9Z" />
                            </mask>
                            <path d="M0 9H55.75V33H0V9Z" fill="#EBEBEB" />
                            <path
                              d="M54.25 9V33H57.25V9H54.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_741_15413)"
                            />
                            <mask id="path-4-inside-2_741_15413" fill="white">
                              <path d="M55.75 9H111.5V33H55.75V9Z" />
                            </mask>
                            <path
                              d="M55.75 9H111.5V33H55.75V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M110 9V33H113V9H110Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_741_15413)"
                            />
                            <mask id="path-6-inside-3_741_15413" fill="white">
                              <path d="M111.5 9H167.25V33H111.5V9Z" />
                            </mask>
                            <path
                              d="M111.5 9H167.25V33H111.5V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M165.75 9V33H168.75V9H165.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_741_15413)"
                            />
                            <rect
                              width="55.75"
                              height="24"
                              transform="translate(167.25 9)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M87.5191 0.00209775L87.9912 -3.50076e-07C89.9534 -2.64307e-07 91.7422 0.118695 92.9084 0.297489L93.6336 0.454121C94.0176 0.541264 94.4549 0.655827 94.6782 0.775274C95.4948 1.21249 96 2.0674 96 2.9824L96 3.06203C95.9809 3.65851 95.4742 4.91157 95.4566 4.91157C94.6376 6.92788 92.1657 10.8179 90.4035 12.6145L89.8744 13.1365C89.731 13.2733 89.5613 13.4269 89.429 13.5222C89.0207 13.8407 88.5155 14 88.0103 14C87.4463 14 86.922 13.8212 86.4931 13.4832L85.9327 12.9468L85.8131 12.8266C84.1021 11.1964 81.3042 6.9399 80.448 4.71324L80.3232 4.37707C80.1829 3.97253 80.0154 3.40572 80 3.06203C80 2.62481 80.0984 2.20713 80.2923 1.80897C80.564 1.31165 80.9928 0.915003 81.4981 0.695642C81.8476 0.555913 82.8977 0.336552 82.9168 0.336552C83.9757 0.135453 85.6464 0.0188471 87.5191 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_741_15413">
                              <rect
                                y="9"
                                width="223"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          className="2xl:hidden  flex max-md:hidden"
                          height="33"
                          viewBox="0 0 63 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_741_14829)">
                            <mask id="path-2-inside-1_741_14829" fill="white">
                              <path d="M0 9H15.75V33H0V9Z" />
                            </mask>
                            <path d="M0 9H15.75V33H0V9Z" fill="#EBEBEB" />
                            <path
                              d="M14.25 9V33H17.25V9H14.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_741_14829)"
                            />
                            <mask id="path-4-inside-2_741_14829" fill="white">
                              <path d="M15.75 9H31.5V33H15.75V9Z" />
                            </mask>
                            <path
                              d="M15.75 9H31.5V33H15.75V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M30 9V33H33V9H30Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_741_14829)"
                            />
                            <mask id="path-6-inside-3_741_14829" fill="white">
                              <path d="M31.5 9H47.25V33H31.5V9Z" />
                            </mask>
                            <path d="M31.5 9H47.25V33H31.5V9Z" fill="#EBEBEB" />
                            <path
                              d="M45.75 9V33H48.75V9H45.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_741_14829)"
                            />
                            <rect
                              width="15.75"
                              height="24"
                              transform="translate(47.25 9)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M7.51906 0.00209775L7.99119 -3.50076e-07C9.95337 -2.64307e-07 11.7422 0.118695 12.9084 0.297489L13.6336 0.454121C14.0176 0.541264 14.4549 0.655827 14.6782 0.775274C15.4948 1.21249 16 2.0674 16 2.9824L16 3.06203C15.9809 3.65851 15.4742 4.91157 15.4566 4.91157C14.6376 6.92788 12.1657 10.8179 10.4035 12.6145L9.87442 13.1365C9.73103 13.2733 9.56132 13.4269 9.42904 13.5222C9.02075 13.8407 8.51551 14 8.01028 14C7.4463 14 6.92198 13.8212 6.49312 13.4832L5.93271 12.9468L5.81311 12.8266C4.10208 11.1964 1.30421 6.9399 0.447954 4.71324L0.323229 4.37707C0.182854 3.97253 0.0154217 3.40572 8.19829e-07 3.06203C8.3894e-07 2.62481 0.0984029 2.20713 0.292272 1.80897C0.563981 1.31165 0.992841 0.915003 1.49807 0.695642C1.84762 0.555913 2.89774 0.336552 2.91683 0.336552C3.97565 0.135453 5.64642 0.0188471 7.51906 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_741_14829">
                              <rect
                                y="9"
                                width="63"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          className="hidden max-md:flex"
                          width="179"
                          height="31"
                          viewBox="0 0 179 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1_1278)">
                            <mask id="path-2-inside-1_1_1278" fill="white">
                              <path d="M0 7H44.75V31H0V7Z" />
                            </mask>
                            <path d="M0 7H44.75V31H0V7Z" fill="#EBEBEB" />
                            <path
                              d="M43.25 7V31H46.25V7H43.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_1_1278)"
                            />
                            <mask id="path-4-inside-2_1_1278" fill="white">
                              <path d="M44.75 7H89.5V31H44.75V7Z" />
                            </mask>
                            <path
                              d="M44.75 7H89.5V31H44.75V7Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M88 7V31H91V7H88Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_1_1278)"
                            />
                            <mask id="path-6-inside-3_1_1278" fill="white">
                              <path d="M89.5 7H134.25V31H89.5V7Z" />
                            </mask>
                            <path
                              d="M89.5 7H134.25V31H89.5V7Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M132.75 7V31H135.75V7H132.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_1_1278)"
                            />
                            <rect
                              width="44.75"
                              height="24"
                              transform="translate(134.25 7)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M12.5191 0.00209775L12.9912 -3.50076e-07C14.9534 -2.64307e-07 16.7422 0.118695 17.9084 0.297489L18.6336 0.454121C19.0176 0.541264 19.4549 0.655827 19.6782 0.775274C20.4948 1.21249 21 2.0674 21 2.9824L21 3.06203C20.9809 3.65851 20.4742 4.91157 20.4566 4.91157C19.6376 6.92788 17.1657 10.8179 15.4035 12.6145L14.8744 13.1365C14.731 13.2733 14.5613 13.4269 14.429 13.5222C14.0207 13.8407 13.5155 14 13.0103 14C12.4463 14 11.922 13.8212 11.4931 13.4832L10.9327 12.9468L10.8131 12.8266C9.10208 11.1964 6.30421 6.9399 5.44795 4.71324L5.32323 4.37707C5.18285 3.97253 5.01542 3.40572 5 3.06203C5 2.62481 5.0984 2.20713 5.29227 1.80897C5.56398 1.31165 5.99284 0.915003 6.49807 0.695642C6.84762 0.555913 7.89774 0.336552 7.91683 0.336552C8.97565 0.135453 10.6464 0.0188471 12.5191 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_1_1278">
                              <rect
                                y="7"
                                width="179"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className="font-semibold text-[14px]">$289.52</p>
                    </div>
                  </div>
                  <div className="justify-between md:flex min-[720px]:block sm:flex py-[6px]">
                    <div className=" lg:w-full w-[150px] justify-between">
                      <p className="text-[14px] text-[#101011] ">
                        50-Day Range
                      </p>
                    </div>
                    <div className="flex gap-[16px]  items-center">
                      <p className="font-semibold text-[14px] py-2">$289.52</p>
                      <div className="mt-[-10px]">
                        <svg
                          className="hidden 2xl:flex"
                          width="223"
                          height="33"
                          viewBox="0 0 223 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_741_15413)">
                            <mask id="path-2-inside-1_741_15413" fill="white">
                              <path d="M0 9H55.75V33H0V9Z" />
                            </mask>
                            <path d="M0 9H55.75V33H0V9Z" fill="#EBEBEB" />
                            <path
                              d="M54.25 9V33H57.25V9H54.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_741_15413)"
                            />
                            <mask id="path-4-inside-2_741_15413" fill="white">
                              <path d="M55.75 9H111.5V33H55.75V9Z" />
                            </mask>
                            <path
                              d="M55.75 9H111.5V33H55.75V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M110 9V33H113V9H110Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_741_15413)"
                            />
                            <mask id="path-6-inside-3_741_15413" fill="white">
                              <path d="M111.5 9H167.25V33H111.5V9Z" />
                            </mask>
                            <path
                              d="M111.5 9H167.25V33H111.5V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M165.75 9V33H168.75V9H165.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_741_15413)"
                            />
                            <rect
                              width="55.75"
                              height="24"
                              transform="translate(167.25 9)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M87.5191 0.00209775L87.9912 -3.50076e-07C89.9534 -2.64307e-07 91.7422 0.118695 92.9084 0.297489L93.6336 0.454121C94.0176 0.541264 94.4549 0.655827 94.6782 0.775274C95.4948 1.21249 96 2.0674 96 2.9824L96 3.06203C95.9809 3.65851 95.4742 4.91157 95.4566 4.91157C94.6376 6.92788 92.1657 10.8179 90.4035 12.6145L89.8744 13.1365C89.731 13.2733 89.5613 13.4269 89.429 13.5222C89.0207 13.8407 88.5155 14 88.0103 14C87.4463 14 86.922 13.8212 86.4931 13.4832L85.9327 12.9468L85.8131 12.8266C84.1021 11.1964 81.3042 6.9399 80.448 4.71324L80.3232 4.37707C80.1829 3.97253 80.0154 3.40572 80 3.06203C80 2.62481 80.0984 2.20713 80.2923 1.80897C80.564 1.31165 80.9928 0.915003 81.4981 0.695642C81.8476 0.555913 82.8977 0.336552 82.9168 0.336552C83.9757 0.135453 85.6464 0.0188471 87.5191 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_741_15413">
                              <rect
                                y="9"
                                width="223"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          className="2xl:hidden  flex max-md:hidden"
                          height="33"
                          viewBox="0 0 63 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_741_14829)">
                            <mask id="path-2-inside-1_741_14829" fill="white">
                              <path d="M0 9H15.75V33H0V9Z" />
                            </mask>
                            <path d="M0 9H15.75V33H0V9Z" fill="#EBEBEB" />
                            <path
                              d="M14.25 9V33H17.25V9H14.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_741_14829)"
                            />
                            <mask id="path-4-inside-2_741_14829" fill="white">
                              <path d="M15.75 9H31.5V33H15.75V9Z" />
                            </mask>
                            <path
                              d="M15.75 9H31.5V33H15.75V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M30 9V33H33V9H30Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_741_14829)"
                            />
                            <mask id="path-6-inside-3_741_14829" fill="white">
                              <path d="M31.5 9H47.25V33H31.5V9Z" />
                            </mask>
                            <path d="M31.5 9H47.25V33H31.5V9Z" fill="#EBEBEB" />
                            <path
                              d="M45.75 9V33H48.75V9H45.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_741_14829)"
                            />
                            <rect
                              width="15.75"
                              height="24"
                              transform="translate(47.25 9)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M7.51906 0.00209775L7.99119 -3.50076e-07C9.95337 -2.64307e-07 11.7422 0.118695 12.9084 0.297489L13.6336 0.454121C14.0176 0.541264 14.4549 0.655827 14.6782 0.775274C15.4948 1.21249 16 2.0674 16 2.9824L16 3.06203C15.9809 3.65851 15.4742 4.91157 15.4566 4.91157C14.6376 6.92788 12.1657 10.8179 10.4035 12.6145L9.87442 13.1365C9.73103 13.2733 9.56132 13.4269 9.42904 13.5222C9.02075 13.8407 8.51551 14 8.01028 14C7.4463 14 6.92198 13.8212 6.49312 13.4832L5.93271 12.9468L5.81311 12.8266C4.10208 11.1964 1.30421 6.9399 0.447954 4.71324L0.323229 4.37707C0.182854 3.97253 0.0154217 3.40572 8.19829e-07 3.06203C8.3894e-07 2.62481 0.0984029 2.20713 0.292272 1.80897C0.563981 1.31165 0.992841 0.915003 1.49807 0.695642C1.84762 0.555913 2.89774 0.336552 2.91683 0.336552C3.97565 0.135453 5.64642 0.0188471 7.51906 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_741_14829">
                              <rect
                                y="9"
                                width="63"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          className="hidden max-md:flex"
                          width="179"
                          height="31"
                          viewBox="0 0 179 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1_1278)">
                            <mask id="path-2-inside-1_1_1278" fill="white">
                              <path d="M0 7H44.75V31H0V7Z" />
                            </mask>
                            <path d="M0 7H44.75V31H0V7Z" fill="#EBEBEB" />
                            <path
                              d="M43.25 7V31H46.25V7H43.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_1_1278)"
                            />
                            <mask id="path-4-inside-2_1_1278" fill="white">
                              <path d="M44.75 7H89.5V31H44.75V7Z" />
                            </mask>
                            <path
                              d="M44.75 7H89.5V31H44.75V7Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M88 7V31H91V7H88Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_1_1278)"
                            />
                            <mask id="path-6-inside-3_1_1278" fill="white">
                              <path d="M89.5 7H134.25V31H89.5V7Z" />
                            </mask>
                            <path
                              d="M89.5 7H134.25V31H89.5V7Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M132.75 7V31H135.75V7H132.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_1_1278)"
                            />
                            <rect
                              width="44.75"
                              height="24"
                              transform="translate(134.25 7)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M12.5191 0.00209775L12.9912 -3.50076e-07C14.9534 -2.64307e-07 16.7422 0.118695 17.9084 0.297489L18.6336 0.454121C19.0176 0.541264 19.4549 0.655827 19.6782 0.775274C20.4948 1.21249 21 2.0674 21 2.9824L21 3.06203C20.9809 3.65851 20.4742 4.91157 20.4566 4.91157C19.6376 6.92788 17.1657 10.8179 15.4035 12.6145L14.8744 13.1365C14.731 13.2733 14.5613 13.4269 14.429 13.5222C14.0207 13.8407 13.5155 14 13.0103 14C12.4463 14 11.922 13.8212 11.4931 13.4832L10.9327 12.9468L10.8131 12.8266C9.10208 11.1964 6.30421 6.9399 5.44795 4.71324L5.32323 4.37707C5.18285 3.97253 5.01542 3.40572 5 3.06203C5 2.62481 5.0984 2.20713 5.29227 1.80897C5.56398 1.31165 5.99284 0.915003 6.49807 0.695642C6.84762 0.555913 7.89774 0.336552 7.91683 0.336552C8.97565 0.135453 10.6464 0.0188471 12.5191 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_1_1278">
                              <rect
                                y="7"
                                width="179"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className="font-semibold text-[14px]">$289.52</p>
                    </div>
                  </div>
                  <div className="justify-between md:flex min-[720px]:block sm:flex py-[6px]">
                    <div className=" lg:w-full w-[150px] justify-between">
                      <p className="text-[14px] text-[#101011] ">
                        52-Week Range
                      </p>
                    </div>
                    <div className="flex gap-[16px]  items-center">
                      <p className="font-semibold text-[14px] py-2">$289.52</p>
                      <div className="mt-[-10px]">
                        <svg
                          className="hidden 2xl:flex"
                          width="223"
                          height="33"
                          viewBox="0 0 223 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_741_15413)">
                            <mask id="path-2-inside-1_741_15413" fill="white">
                              <path d="M0 9H55.75V33H0V9Z" />
                            </mask>
                            <path d="M0 9H55.75V33H0V9Z" fill="#EBEBEB" />
                            <path
                              d="M54.25 9V33H57.25V9H54.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_741_15413)"
                            />
                            <mask id="path-4-inside-2_741_15413" fill="white">
                              <path d="M55.75 9H111.5V33H55.75V9Z" />
                            </mask>
                            <path
                              d="M55.75 9H111.5V33H55.75V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M110 9V33H113V9H110Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_741_15413)"
                            />
                            <mask id="path-6-inside-3_741_15413" fill="white">
                              <path d="M111.5 9H167.25V33H111.5V9Z" />
                            </mask>
                            <path
                              d="M111.5 9H167.25V33H111.5V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M165.75 9V33H168.75V9H165.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_741_15413)"
                            />
                            <rect
                              width="55.75"
                              height="24"
                              transform="translate(167.25 9)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M87.5191 0.00209775L87.9912 -3.50076e-07C89.9534 -2.64307e-07 91.7422 0.118695 92.9084 0.297489L93.6336 0.454121C94.0176 0.541264 94.4549 0.655827 94.6782 0.775274C95.4948 1.21249 96 2.0674 96 2.9824L96 3.06203C95.9809 3.65851 95.4742 4.91157 95.4566 4.91157C94.6376 6.92788 92.1657 10.8179 90.4035 12.6145L89.8744 13.1365C89.731 13.2733 89.5613 13.4269 89.429 13.5222C89.0207 13.8407 88.5155 14 88.0103 14C87.4463 14 86.922 13.8212 86.4931 13.4832L85.9327 12.9468L85.8131 12.8266C84.1021 11.1964 81.3042 6.9399 80.448 4.71324L80.3232 4.37707C80.1829 3.97253 80.0154 3.40572 80 3.06203C80 2.62481 80.0984 2.20713 80.2923 1.80897C80.564 1.31165 80.9928 0.915003 81.4981 0.695642C81.8476 0.555913 82.8977 0.336552 82.9168 0.336552C83.9757 0.135453 85.6464 0.0188471 87.5191 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_741_15413">
                              <rect
                                y="9"
                                width="223"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          className="2xl:hidden  flex max-md:hidden"
                          height="33"
                          viewBox="0 0 63 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_741_14829)">
                            <mask id="path-2-inside-1_741_14829" fill="white">
                              <path d="M0 9H15.75V33H0V9Z" />
                            </mask>
                            <path d="M0 9H15.75V33H0V9Z" fill="#EBEBEB" />
                            <path
                              d="M14.25 9V33H17.25V9H14.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_741_14829)"
                            />
                            <mask id="path-4-inside-2_741_14829" fill="white">
                              <path d="M15.75 9H31.5V33H15.75V9Z" />
                            </mask>
                            <path
                              d="M15.75 9H31.5V33H15.75V9Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M30 9V33H33V9H30Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_741_14829)"
                            />
                            <mask id="path-6-inside-3_741_14829" fill="white">
                              <path d="M31.5 9H47.25V33H31.5V9Z" />
                            </mask>
                            <path d="M31.5 9H47.25V33H31.5V9Z" fill="#EBEBEB" />
                            <path
                              d="M45.75 9V33H48.75V9H45.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_741_14829)"
                            />
                            <rect
                              width="15.75"
                              height="24"
                              transform="translate(47.25 9)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M7.51906 0.00209775L7.99119 -3.50076e-07C9.95337 -2.64307e-07 11.7422 0.118695 12.9084 0.297489L13.6336 0.454121C14.0176 0.541264 14.4549 0.655827 14.6782 0.775274C15.4948 1.21249 16 2.0674 16 2.9824L16 3.06203C15.9809 3.65851 15.4742 4.91157 15.4566 4.91157C14.6376 6.92788 12.1657 10.8179 10.4035 12.6145L9.87442 13.1365C9.73103 13.2733 9.56132 13.4269 9.42904 13.5222C9.02075 13.8407 8.51551 14 8.01028 14C7.4463 14 6.92198 13.8212 6.49312 13.4832L5.93271 12.9468L5.81311 12.8266C4.10208 11.1964 1.30421 6.9399 0.447954 4.71324L0.323229 4.37707C0.182854 3.97253 0.0154217 3.40572 8.19829e-07 3.06203C8.3894e-07 2.62481 0.0984029 2.20713 0.292272 1.80897C0.563981 1.31165 0.992841 0.915003 1.49807 0.695642C1.84762 0.555913 2.89774 0.336552 2.91683 0.336552C3.97565 0.135453 5.64642 0.0188471 7.51906 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_741_14829">
                              <rect
                                y="9"
                                width="63"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        <svg
                          className="hidden max-md:flex"
                          width="179"
                          height="31"
                          viewBox="0 0 179 31"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_1_1278)">
                            <mask id="path-2-inside-1_1_1278" fill="white">
                              <path d="M0 7H44.75V31H0V7Z" />
                            </mask>
                            <path d="M0 7H44.75V31H0V7Z" fill="#EBEBEB" />
                            <path
                              d="M43.25 7V31H46.25V7H43.25Z"
                              fill="#D3D3D3"
                              mask="url(#path-2-inside-1_1_1278)"
                            />
                            <mask id="path-4-inside-2_1_1278" fill="white">
                              <path d="M44.75 7H89.5V31H44.75V7Z" />
                            </mask>
                            <path
                              d="M44.75 7H89.5V31H44.75V7Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M88 7V31H91V7H88Z"
                              fill="#D3D3D3"
                              mask="url(#path-4-inside-2_1_1278)"
                            />
                            <mask id="path-6-inside-3_1_1278" fill="white">
                              <path d="M89.5 7H134.25V31H89.5V7Z" />
                            </mask>
                            <path
                              d="M89.5 7H134.25V31H89.5V7Z"
                              fill="#EBEBEB"
                            />
                            <path
                              d="M132.75 7V31H135.75V7H132.75Z"
                              fill="#D3D3D3"
                              mask="url(#path-6-inside-3_1_1278)"
                            />
                            <rect
                              width="44.75"
                              height="24"
                              transform="translate(134.25 7)"
                              fill="#EBEBEB"
                            />
                          </g>
                          <path
                            d="M12.5191 0.00209775L12.9912 -3.50076e-07C14.9534 -2.64307e-07 16.7422 0.118695 17.9084 0.297489L18.6336 0.454121C19.0176 0.541264 19.4549 0.655827 19.6782 0.775274C20.4948 1.21249 21 2.0674 21 2.9824L21 3.06203C20.9809 3.65851 20.4742 4.91157 20.4566 4.91157C19.6376 6.92788 17.1657 10.8179 15.4035 12.6145L14.8744 13.1365C14.731 13.2733 14.5613 13.4269 14.429 13.5222C14.0207 13.8407 13.5155 14 13.0103 14C12.4463 14 11.922 13.8212 11.4931 13.4832L10.9327 12.9468L10.8131 12.8266C9.10208 11.1964 6.30421 6.9399 5.44795 4.71324L5.32323 4.37707C5.18285 3.97253 5.01542 3.40572 5 3.06203C5 2.62481 5.0984 2.20713 5.29227 1.80897C5.56398 1.31165 5.99284 0.915003 6.49807 0.695642C6.84762 0.555913 7.89774 0.336552 7.91683 0.336552C8.97565 0.135453 10.6464 0.0188471 12.5191 0.00209775Z"
                            fill="#027EF4"
                          />
                          <defs>
                            <clipPath id="clip0_1_1278">
                              <rect
                                y="7"
                                width="179"
                                height="24"
                                rx="4"
                                fill="white"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p className="font-semibold text-[14px]">$289.52</p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">
                        Shares Outstanding
                      </p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">Volume</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">
                        Average Volume
                      </p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full block h-[196px]">
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">Market Cap</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">
                        Enterprise Value
                      </p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">Gross Margin</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">ROIC</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">EPS</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">
                        Divident Yield
                      </p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        $923.15 billion
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full block h-[196px]">
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">PE</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">85.66</p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">Forward PE</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        294.23 - 297.48
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">P/FCF</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        294.23 - 297.48
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">P/S</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        294.23 - 297.48
                      </p>
                    </div>
                  </div>
                  <div className="justify-between flex py-[6px]">
                    <div>
                      <p className="text-[14px] text-[#101011]">P/B</p>
                    </div>
                    <div className="flex gap-[16px] items-center">
                      <p className="font-semibold text-[14px]">
                        294.23 - 297.48
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:mt-20 mt-[24px]">
          <div className="flex items-center">
            <h1 className="text-[#101011] text-[22px] font-medium">
              Recent articles
            </h1>
            <ArrowDRShirtIcon size={32} className="ml-3" />
          </div>
          <CompanyArticles sortBy="date" />
        </div>

        <div className="mt-20">
          <div className="flex items-center">
            <h1 className="text-[#101011] text-[22px] font-medium">
              Popular articles
            </h1>
            <ArrowDRShirtIcon size={32} className="ml-3" />
          </div>
          <CompanyArticles sortBy="rating" />
        </div>
      </main>
    </>
  );
}
