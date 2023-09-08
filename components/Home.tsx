"use client";

import Head from "next/head";
import {
  BsArrowDownRight as ArrowDRIcon,
  BsArrowUpRight as ArrowTRIcon,
} from "react-icons/bs";
import {
  FiArrowDownRight as ArrowDRShirtIcon,
  FiSearch as SearchIcon,
} from "react-icons/fi";
import MarketOverview from "./MarketOverview";
import LatestNews from "./LatestNews";
import CategorySection from "./Category";
import Image from "next/image";

export default function Home() {
  return (
    <main className="darok:bg-black 2xl:max-w-[1720px] xl:max-w-[1240px] sm:max-w-full max-w-[358px] mx-auto px-0 sm:px-6 darok:text-gray-100 min-h-screen">
      <Head>
        <title>{"Home"}</title>
      </Head>
      <div
        className=" w-full h-auto 2xl:max-w-[1720px] xl:max-w-[1240px] max-w-[358px] sm:max-w-full 
        justify-between mx-auto p-[24px] md:mt-16 mt-[27px] rounded-xl ml-auto mr-auto bg-gradient-to-r from-[#E4572E] 
        from-50% to-90% to-[#248FF4] lg:flex items-center relative">
        <Image
          src={"/vector-122.svg"}
          width={480}
          height={480}
          className="2xl:flex hidden w-[480px] z-20 h-auto absolute bottom-0 right-[30%]"
          alt="HomeIcon1"
        />

        <Image
          className="2xl:hidden flex w-auto z-20 h-full absolute top-0 left-[10%] max-sm:left-0"
          width={200}
          height={200}
          src="/vector-302.svg"
          alt="HomeIcon"
        />
        <div className=" min-w-[310px] flex justify-center mx-right z-10 ">
          <div className="w-full">
            <h1 className="2xl:hidden flex max-md:hidden text-[36px] leading-[44px] font-semibold text-white">
              Find Information <br />
              about stocks and <br />
              investments here
            </h1>
            <h1 className="flex md:hidden text-[26px] leading-[44px] font-semibold text-white">
              Find Information about
              <br /> stocks and investments <br />
              here
            </h1>
            <h1 className="2xl:flex hidden text-[36px]  leading-[44px] font-semibold text-white">
              Find Information about stocks and investments <br />
              here
            </h1>
            <div className="w-full">
              <div className="w-full h-[46px] md:my-[16px] mt-[12px] mb-[8px] relative">
                <input
                  className="w-full h-full  rounded-lg px-6"
                  placeholder="Search Stocks"
                />
                <SearchIcon
                  className="absolute color-[#101011] top-[12px] right-[10px]"
                  size={24}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="xl:w-[710px]   flex justify-center items-center z-10">
          <div className="w-full ">
            <div className="w-full grid min-[1200px]:grid-cols-3 place-items-center grid-cols-2 md:gap-[16px] gap-y-[8px] gap-x-[16px]">
              <div className="lg:w-[226px] w-full h-[38px] rounded-lg bg-[#D2F8CC] flex items-center max-sm:w-[151px]">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">
                  2.08%
                </h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div>
              <div className=" lg:w-[226px] w-full h-[38px] rounded-lg bg-[#D2F8CC] flex items-center max-sm:w-[151px]">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">
                  2.08%
                </h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div>
              <div className=" lg:w-[226px] w-full h-[38px] rounded-lg bg-[#D2F8CC] flex items-center max-sm:w-[151px]">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">
                  2.08%
                </h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div>
              <div className=" lg:w-[226px] w-full h-[38px] rounded-lg bg-[#D2F8CC] flex items-center max-sm:w-[151px]">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">
                  2.08%
                </h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div>
              <div className=" lg:w-[226px] w-full h-[38px] rounded-lg bg-[#D2F8CC] flex items-center max-sm:w-[151px]">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">
                  2.08%
                </h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div>
              <div className=" lg:w-[226px] w-full h-[38px] rounded-lg bg-[#D2F8CC] flex items-center max-sm:w-[151px]">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">
                  2.08%
                </h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div>
              {/* <div className=" sm:w-[226px] h-[38px] rounded-lg bg-[#D2F8CC] flex items-center w-[159px]">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">2.08%</h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div>
              <div className=" sm:w-[226px] h-[38px] rounded-lg bg-[#D2F8CC] flex items-center w-[159px]">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">2.08%</h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div>
              <div className="flex max-[1200px]:hidden w-[226px] h-[38px] rounded-lg bg-[#D2F8CC] items-center">
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tl-lg rounded-bl-lg px-4 mr-auto">
                  <h3 className="font-medium text-[14px]">APPL</h3>
                </div>
                <h3 className="text-[#13B28C] w-[110px] font-semibold text-[14px] text-center">2.08%</h3>
                <div className="bg-white h-[38px] flex items-center justify-center rounded-tr-lg rounded-br-lg px-4 ml-auto">
                  <ArrowDRShirtIcon />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="md:mt-16 mt-[28px]">
        <div className="flex items-center">
          <h1 className="text-[#101011] text-[26px] font-medium">
            Market Indicies
          </h1>
          <ArrowDRShirtIcon size={32} className="ml-3" />
        </div>
        <div className="w-full grid lg:grid-cols-5 grid-cols-2 gap-5 mt-6 ">
          <div className="w-full h-[84px] rounded-lg bg-[#E4572E] pl-1">
            <div className="w-full h-full bg-white rounded-tr-lg rounded-br-lg">
              <div className="flex items-center p-3">
                <h3 className="text-[14px] font-normal mr-auto">DOW JONES</h3>
                <h3 className="text-[14px] font-normal ml-auto">37400</h3>
              </div>
              <div className="flex items-center px-3">
                <div className="flex items-center rounded-[4px] bg-[#FFD3C6] px-[4px]">
                  <p className="text-[14px] text-[#E4572E] font-semibold ml-auto">
                    -22
                  </p>
                  <ArrowDRIcon className="ml-1" color="#E4572E" />
                </div>
                <div className="flex items-center rounded-[4px] bg-[#FFD3C6] px-[4px] ml-2">
                  <p className="text-[14px] text-[#E4572E] font-semibold ml-auto">
                    -0.7%
                  </p>
                  <ArrowDRIcon className="ml-1" color="#E4572E" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[84px] rounded-lg bg-[#13B28C] pl-1">
            <div className="w-full h-full bg-white rounded-tr-lg rounded-br-lg">
              <div className="flex items-center p-3">
                <h3 className="text-[14px] font-normal mr-auto">S&P500</h3>
                <h3 className="text-[14px] font-normal ml-auto">37400</h3>
              </div>
              <div className="flex items-center px-3">
                <div className="flex items-center rounded-[4px] bg-[#D2F8CC] px-[4px]">
                  <p className="text-[14px] text-[#13B28C] font-semibold ml-auto">
                    +22
                  </p>
                  <ArrowTRIcon className="ml-1" color="#13B28C" />
                </div>
                <div className="flex items-center rounded-[4px] bg-[#D2F8CC] px-[4px] ml-2">
                  <p className="text-[14px] text-[#13B28C] font-semibold ml-auto">
                    +0.7%
                  </p>
                  <ArrowTRIcon className="ml-1" color="#13B28C" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[84px] rounded-lg bg-[#13B28C] pl-1">
            <div className="w-full h-full bg-white rounded-tr-lg rounded-br-lg">
              <div className="flex items-center p-3">
                <h3 className="text-[14px] font-normal mr-auto">S&P500</h3>
                <h3 className="text-[14px] font-normal ml-auto">37400</h3>
              </div>
              <div className="flex items-center px-3">
                <div className="flex items-center rounded-[4px] bg-[#D2F8CC] px-[4px]">
                  <p className="text-[14px] text-[#13B28C] font-semibold ml-auto">
                    +22
                  </p>
                  <ArrowTRIcon className="ml-1" color="#13B28C" />
                </div>
                <div className="flex items-center rounded-[4px] bg-[#D2F8CC] px-[4px] ml-2">
                  <p className="text-[14px] text-[#13B28C] font-semibold ml-auto">
                    +0.7%
                  </p>
                  <ArrowTRIcon className="ml-1" color="#13B28C" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[84px] rounded-lg bg-[#E4572E] pl-1">
            <div className="w-full h-full bg-white rounded-tr-lg rounded-br-lg">
              <div className="flex items-center p-3">
                <h3 className="text-[14px] font-medium mr-auto">DOW JONES</h3>
                <h3 className="text-[14px] font-normal ml-auto">37400</h3>
              </div>
              <div className="flex items-center px-3">
                <div className="flex items-center rounded-[4px] bg-[#FFD3C6] px-[4px]">
                  <p className="text-[14px] text-[#E4572E] font-semibold ml-auto">
                    -22
                  </p>
                  <ArrowDRIcon className="ml-1" color="#E4572E" />
                </div>
                <div className="flex items-center rounded-[4px] bg-[#FFD3C6] px-[4px] ml-2">
                  <p className="text-[14px] text-[#E4572E] font-semibold ml-auto">
                    -0.7%
                  </p>
                  <ArrowDRIcon className="ml-1" color="#E4572E" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-[84px] rounded-lg bg-[#13B28C] pl-1">
            <div className="w-full h-full bg-white rounded-tr-lg rounded-br-lg">
              <div className="flex items-center p-3">
                <h3 className="text-[14px] font-normal mr-auto">S&P500</h3>
                <h3 className="text-[14px] font-normal ml-auto">37400</h3>
              </div>
              <div className="flex items-center px-3">
                <div className="flex items-center rounded-[4px] bg-[#D2F8CC] px-[4px]">
                  <p className="text-[14px] text-[#13B28C] font-semibold ml-auto">
                    +22
                  </p>
                  <ArrowTRIcon className="ml-1" color="#13B28C" />
                </div>
                <div className="flex items-center rounded-[4px] bg-[#D2F8CC] px-[4px] ml-2">
                  <p className="text-[14px] text-[#13B28C] font-semibold ml-auto">
                    +0.7%
                  </p>
                  <ArrowTRIcon className="ml-1" color="#13B28C" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MarketOverview />

      <div className="mt-20">
        <div className="flex items-center">
          <h1 className="text-[#101011] text-[26px] font-medium">
            Latest market news
          </h1>
          <ArrowDRShirtIcon size={32} className="ml-3" />
        </div>
        <LatestNews sortBy="date" />
      </div>
      <div className="mt-20 hidden bg-black w-full h-[166px] rounded-xl md:flex justify-center items-center relative p-[32px]">
        <img
          className="h-[166px] w-auto absolute top-0 right-[20%]"
          src="/vector-300.svg"
          alt="HomeIcon"
        />
        <Image
          width={100}
          height={166}
          className="h-[166px] w-auto absolute bottom-0 right-0"
          src="/vector-301.svg"
          alt="HomeIcon"
        />
        <div className="w-[50%] flex justify-between items-center z-10">
          <div className="w-full">
            <h1 className="text-[36px] leading-[44px] font-semibold text-white">
              Back to 2055
            </h1>
            <p className="text-white text-[18px] leading-[26px] font-normal mt-[32px]">
              Meeting 1.5 C - it’s not about the destination, it’s about the
              speed
            </p>
          </div>
        </div>
        <div className="w-[50%] flex justify-center items-center z-10">
          <div className="w-full flex">
            <button className="bg-[#027EF4] text-white py-[16px] px-[12px] rounded-lg ml-auto text-[14px] font-semibold">
              Explore The Newest Product..
            </button>
          </div>
        </div>
      </div>

      <div className="mt-20 md:block hidden">
        <div className="flex items-center">
          <h1 className="text-[#101011] text-[22px] font-medium">
            Most Popular
          </h1>
          <ArrowDRShirtIcon size={40} className="ml-3" />
        </div>
        <LatestNews sortBy="rating" />
      </div>
      <CategorySection />
    </main>
  );
}
