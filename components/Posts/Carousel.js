import { useState, useRef, useEffect } from "react";
import Post from "./Post";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';


const Carousel = ({ data, loading }) => {
  const handleDragStart = (e) => e.preventDefault();

  const loadingItems = [...Array(5)].map((val, i) => (
    <div
      key={i}
      className="relative carousel-item snap-start"
    >
      <div
        key={i}
        className="flex flex-col w-[280px] md:w-[290px] shadow-box shadow-black/20 hover:shadow-black/50 rounded-3xl p-[9px] overflow-hidden dark:bg-formBox bg-back ring-2 ring-opacity-5 ring-black"
      >
        <div className="h-[160px] w-full md:h-[180px] dark:border-background dark:bg-formBox">
          <Skeleton height={160} className="" baseColor="gray" />
        </div>
        <div className="pt-2 pb-4 px-4 flex flex-col">
          <span>
            <Skeleton width={140} className="" baseColor="silver" />
          </span>
          <div className="flex flex-col mt-2 gap-1">
            <span>
              <Skeleton width={100} className="" baseColor="gray" />
            </span>
            <span className="flex flex-col">
              <Skeleton height={12} baseColor="silver" />
              <Skeleton height={12} baseColor="silver" />
            </span>
          </div>
          <span className="flex justify-end mt-2">
            <Skeleton width={80} height={30} baseColor="silver" />
          </span>
        </div>
      </div>
    </div>
  ))

  return (
    <div className="ml-[50px] md:ml-[100px] lg:ml-[160px] relative">
      <div className="pt-5 w-fit relative mb-10">
        <span className="border-b-[8px] border-orange-400/20 top-2/3 absolute dark:border-purple-800/40 w-full "></span>
        <span className="font-medium text-gray-800 text-3xl text-left  dark:text-white">
          RECENT BLOGPOSTS
        </span>
      </div>
      < AliceCarousel
        items={!loading ? data?.map((data, i) => 
        <div className="w-[300px]" key={i}>
          <Post blog={data} handleDragStart={handleDragStart} />
        </div>
        ) : loadingItems}
        autoWidth
        keyboardNavigation
        mouseTracking
        disableDotsControls
      />
    </div>
  );
}

export default Carousel;