import React from "react";
import SideVideoItem from "./SideVideoItem";
import { useGetVideosQuery } from "../../../features/videos/VideosApi";

const SideVideos = () => {
  //get data
  const { data, isLoading, isError } = useGetVideosQuery();

  //declare content
  let content = null;

  //handle loading
  if (isLoading) {
    content = <p>Loading...</p>;
  }

 

  //found video
  if (!isLoading && !isError && data?.length > 0) {
    content = data.map((dt) => <SideVideoItem key={dt?.id} video={dt} />);
  }
  return (
    <>

    {
      data?.length > 0 && <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
    }
    
    </>
    
  );
};

export default SideVideos;
