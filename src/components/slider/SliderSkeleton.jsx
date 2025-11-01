import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import background from "../../assets/bkg_skeleton_img.svg";

const SliderSkeleton = () => {
    return (
        <SkeletonTheme
            baseColor="transparent"
            highlightColor="#4A4A4A"
          >
        <div className="relative border-s-slate-800 h-full w-full flex justify-center items-center">
            <img src={background} alt="" height={100} width={100} className="absolute"/>
            <div className="w-full">
                <div className="">
                    <Skeleton height={400} />
                    <div className="absolute bottom-[1%] left-[5%]">
                        <Skeleton height={20} width={200} />
                        <Skeleton height={80} width={300} />
                        <Skeleton height={40} width={100} />
                    </div>
                    <div className="slider-text-background"></div>
                </div>
            </div>
        </div>
        </SkeletonTheme>
    );
};

export default SliderSkeleton;
