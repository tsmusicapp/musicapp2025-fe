import React from "react";
import PurchaseDetailItem from "./purchase-detail-item";
import { formatDate } from "@/utils/utils";

function PurchaseCard({ saleItem }: any) {
  return (
    <>
      <div className="block bg-white border-2 border-black text-surface shadow-secondary-1 w-[43.75rem]">
        <div className="border-b-2 bg-gray-200 border-neutral-100 px-6 py-3">
          <div className="flex justify-between">
            <div className="flex flex-row gap-6">
              <p className="text-sm font-bold">{saleItem.assetTitle}</p>
              <p className="text-sm font-bold">{formatDate(saleItem.created_at)}</p>
            </div>
            <div className="flex flex-row gap-6">
              <p className="text-sm font-bold">Buyer: {saleItem.buyer}</p>
              <p className="text-sm font-bold"> {saleItem.quantity} x ${saleItem.assetPrice}</p>
            </div>
          </div>
        </div>
        <PurchaseDetailItem saleData={saleItem} />
      </div>
    </>
  );
}

export default PurchaseCard;
