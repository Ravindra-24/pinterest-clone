import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import background from "../assets/bkg_skeleton_img.svg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const CardSkeleton = React.memo(() => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        0: 1,
        200: 2,
        750: 3,
        900: 4,
        1100: 5,
        2500: 6,
      }}
    >
      <Masonry gutter="1rem" className="mt-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <SkeletonTheme
            baseColor="transparent"
            highlightColor="#4A4A4A"
            lineHeight={0}
            key={index}
          >
            <div
              className="relative rounded-md shadow-md"
              style={{
                border: "1px solid #4A4A4A",
                display: "block",
                marginBottom: "0.5rem",
              }}
            >
              <Skeleton height={300} />

              <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center">
                <div className="absolute top-0 left-0 flex w-full justify-between items-start">
                  <Skeleton
                    circle={true}
                    height={40}
                    width={40}
                    style={{ marginTop: "0.5rem", marginLeft: "0.5rem" }}
                  />
                  <Skeleton
                    height={20}
                    width={100}
                    style={{ marginTop: "1.3rem" }}
                  />
                </div>
                <img src={background} alt="/" className="w-20 h-20" />
              </div>
            </div>
          </SkeletonTheme>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
});

export default CardSkeleton;
