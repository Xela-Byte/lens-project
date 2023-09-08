"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BsArrowDownRight as ArrowDRIcon,
  BsArrowUpRight as ArrowTRIcon,
} from "react-icons/bs";
import { FiArrowDownRight as ArrowDRShirtIcon } from "react-icons/fi";
import { fetchAPI } from "@/utils/fetch-api";
import { Company } from "@/utils/model";
import { useRouter } from "next/navigation";

export default function MarketOverview() {
  const navigate = useRouter();
  const [data, setData] = useState<Company[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

      const path = `/companies`;
      const urlParamsObject = {
        sort: { name: "desc" },
        populate: {
          cover: { fields: ["url"] },
          company: { populate: "*" },
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
    fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT));
  }, [fetchData]);

  // if (isLoading) return <Loader />;

  return (
    <div className="md:mt-16 mt-[28px]">
      <div className="flex items-center">
        <h1 className="text-[#101011] md:text-[26px] text-[22px] font-medium">
          Market overview
        </h1>
        <ArrowDRShirtIcon size={32} className="ml-3" />
      </div>
      <div className="w-full md:mt-6 mt-[12px]">
        <div className="w-full md:h-[426px] bg-white rounded-xl ">
          <div className="mb-4 border-b border-[#EBEBEB]">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              id="myTab"
              data-tabs-toggle="#myTabContent"
              role="tablist">
              <li className="mr-2" role="presentation">
                <button
                  className="inline-block md:px-2 px-0 h-[38px] border-b-2 border-[#027EF4] bg-gradient-to-b from-[#027EF400] to-[#027EF433] rounded-t-lg md:text-[14px] text-[12px] text-[#027EF4]"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false">
                  Biggest Gainers
                </button>
              </li>
              <li className="mr-2" role="presentation">
                <button
                  className="inline-block md:px-2 px-0 h-[38px] mx-4 border-b-2 border-transparent rounded-t-lg md:text-[14px] text-[12px] hover:text-[#027EF4] hover:border-[#027EF4]"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false">
                  Biggest Losers
                </button>
              </li>
              <li className="mr-2" role="presentation">
                <button
                  className="inline-block md:px-2 px-0 h-[38px] border-b-2 border-transparent rounded-t-lg md:text-[14px] text-[12px] hover:text-[#027EF4] hover:border-[#027EF4] "
                  id="settings-tab"
                  data-tabs-target="#settings"
                  type="button"
                  role="tab"
                  aria-controls="settings"
                  aria-selected="false">
                  Most Activities
                </button>
              </li>
            </ul>
          </div>

          {isLoading ? (
            <>
              <div className="w-full grid grid-cols-4 gap-5">
                <div className="relative overflow-x-auto col-span-3">
                  <div className="mt-3 h-[40px] bg-gray-200 rounded-xl w-full"></div>
                  <div className="mt-3 h-[40px] bg-gray-200 rounded-xl w-full"></div>
                  <div className="mt-3 h-[40px] bg-gray-200 rounded-xl w-full"></div>
                  <div className="mt-3 h-[40px] bg-gray-200 rounded-xl w-full"></div>
                  <div className="mt-3 h-[40px] bg-gray-200 rounded-xl w-full"></div>
                  <div className="mt-3 h-[40px] bg-gray-200 rounded-xl w-full"></div>
                </div>

                <div
                  role="status"
                  className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6">
                  <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2.5"></div>
                  <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full "></div>
                  <div className="flex items-baseline mt-4 space-x-6">
                    <div className="w-full bg-gray-200 rounded-t-lg h-[180px]"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-[110px]"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-[130px] "></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-[70px]"></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-[140px] "></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-[150px] "></div>
                    <div className="w-full bg-gray-200 rounded-t-lg h-[120px] "></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full md:grid grid-cols-4 gap-5 hidden">
                <div className="relative overflow-x-auto col-span-3">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl">
                    <thead className="text-[#101011] text-[14px] font-medium capitalize bg-[#FAFAFA] rounded-xl ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Company
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price Change
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Price Change %
                        </th>
                      </tr>
                    </thead>
                    <div className="w-full h-[14px] bg-white"></div>
                    <tbody>
                      {data &&
                        data.map((c: Company) => (
                          <tr
                            className="cursor-pointer bg-[#FAFAFA] text-[#101011] text-[14px] hover:bg-[#EAEAEA]"
                            onClick={() =>
                              navigate.push(`/${c.attributes.slug}`)
                            }>
                            <th
                              scope="row"
                              className="px-6 py-4 whitespace-nowrap">
                              {c.attributes.name}
                            </th>
                            <td className="px-6 py-4">
                              ${c.attributes.stockPrice}
                            </td>
                            <td className="px-6 py-4">
                              <div className=" flex items-center rounded-md bg-[#D2F8CC] px-[4px] w-max">
                                <p className="text-[14px] text-[#13B28C] font-semibold ">
                                  47%
                                </p>
                                <ArrowTRIcon className="ml-1" color="#13B28C" />
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center rounded-md bg-[#FFD3C6] px-[4px] w-max">
                                <p className="text-[14px] text-[#E4572E] font-semibold">
                                  -22
                                </p>
                                <ArrowDRIcon className="ml-1" color="#E4572E" />
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-xl">
                    <thead className="text-[#101011] text-[14px] font-medium capitalize bg-[#FAFAFA] rounded-xl ">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          Graph
                        </th>
                      </tr>
                    </thead>
                    <div className="w-full h-[14px] bg-white"></div>
                    <tbody>
                      <tr className="bg-[#FAFAFA] text-[#101011] text-[14px] rounded-xl">
                        <td className="w-full h-full"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:hidden w-full hover:border-collapse block">
                {data &&
                  data.map((c: Company) => (
                    <>
                      <table className="w-full content-stretch my-2">
                        <tbody>
                          <tr
                            className="text-left cursor-pointer bg-[#FAFAFA] text-[#101011] text-[14px] hover:bg-[#EAEAEA]"
                            onClick={() =>
                              navigate.push(`/${c.attributes.slug}`)
                            }>
                            <th scope="row" className=" py-4 whitespace-nowrap">
                              Company
                            </th>
                            <td className="text-right  py-4">
                              {c.attributes.name}
                            </td>
                          </tr>
                          <tr
                            className="cursor-pointer bg-[#FAFAFA] text-[#101011] text-[14px] hover:bg-[#EAEAEA]"
                            onClick={() =>
                              navigate.push(`/${c.attributes.slug}`)
                            }>
                            <th
                              scope="row"
                              className="text-left  py-4 whitespace-nowrap">
                              Price
                            </th>
                            <td className="text-right py-4">
                              ${c.attributes.stockPrice}
                            </td>
                          </tr>
                          <tr
                            className="cursor-pointer bg-[#FAFAFA] text-[#101011] text-[14px] hover:bg-[#EAEAEA]"
                            onClick={() =>
                              navigate.push(`/${c.attributes.slug}`)
                            }>
                            <th
                              scope="row"
                              className="text-left py-4 whitespace-nowrap">
                              Price change
                            </th>
                            <td className="flow-root  py-4">
                              <div className="float-right flex items-center rounded-md bg-[#D2F8CC] px-[4px] w-max">
                                <p className=" text-[14px] text-[#13B28C] font-semibold ">
                                  47%
                                </p>
                                <ArrowTRIcon className="ml-1" color="#13B28C" />
                              </div>
                            </td>
                          </tr>
                          <tr
                            className="cursor-pointer bg-[#FAFAFA] text-[#101011] text-[14px] hover:bg-[#EAEAEA]"
                            onClick={() =>
                              navigate.push(`/${c.attributes.slug}`)
                            }>
                            <th
                              scope="row"
                              className="text-left  py-4 whitespace-nowrap">
                              Price change%
                            </th>
                            <td className="flow-root py-4">
                              <div className="float-right flex items-center rounded-md bg-[#FFD3C6] px-[4px] w-max">
                                <p className="text-[14px] text-[#E4572E] font-semibold">
                                  -22
                                </p>
                                <ArrowDRIcon className="ml-1" color="#E4572E" />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  ))}
                <div className="w-full  flex justify-between">
                  <p className="text-left  py-4 whitespace-nowrap font-medium">
                    Graph
                  </p>
                  <select>
                    <option value="1d">1d</option>
                    <option>2d</option>
                    <option>3d</option>
                    <option>4d</option>
                  </select>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
