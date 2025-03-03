import React from "react";
import SalesDetailItem from "./sales-detail-item";
import SalesTipItem from "./sales-tip-item";

interface SalesCardProps {
  saleData: any;
}
function SalesCard({ saleData }: SalesCardProps) {
  return (
    <>
      <div className="block bg-white border-2 border-black text-surface shadow-secondary-1 w-[62.5rem]">
        <div className="border-b-2 bg-gray-200 border-neutral-100 px-6 py-3">
          <div className="flex justify-between">
            <div className="flex flex-row gap-6">
              <p className="text-sm font-bold">{saleData.assetTitle}</p>
              {/* <p className="text-sm font-bold">{saleData.created_at.split("T")[0]}</p> */}
            </div>
            <div className="flex flex-row gap-6">
              <p className="text-sm font-bold">Buyer: {saleData.buyer}</p>
              <p className="text-sm font-bold">${saleData.assetPrice}.00</p>
            </div>
          </div>
        </div>
        <SalesDetailItem saleData={saleData} />
        {/* {
          saleData.tip ? <>
            <hr className="border-black border-1" />
            <SalesTipItem saleData={saleData} />
          </> : null
        } */}
      </div>
    </>
  );
}

export default SalesCard;
