import useSWR from "swr";
import { getBlogs } from "../../api/Blogs";

import Carousel from "./Carousel";
export default function Posts() {
  const { data: blogs, error } = useSWR(
    "https://news-api.aakhyaan.org/wp-json/wp/v2/posts",
    (url) => getBlogs(url), { revalidateOnFocus: false, revalidateOnReconnect: true }
  );
  return (
    <div id="scrollTo" className="py-14 ">
      <div className="absolute rounded-r-[5rem] bg-[#cbe5e9] dark:bg-[#cbe5e9]/30 w-3/4 h-[600px] "></div>
      <Carousel data={blogs} loading={!blogs && !error} />
    </div>
  );
}
