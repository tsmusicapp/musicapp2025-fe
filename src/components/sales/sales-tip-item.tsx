import React from "react";
interface SalesCardProps {
    saleData: any;
}
function SalesTipItem({ saleData }: SalesCardProps) {
    return (
        <>
            <div className="p-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                        <h5 className="text-xl font-medium leading-tight ">Tip</h5>
                        <p className="text-base text-white">Tip</p>
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center text-blue-500">
                        <h5 className="text-xl font-medium leading-tight ">${saleData.tip}.00</h5>
                    </div>
                </div>
            </div>
            <hr className="border-black border-1" />
        </>
    );
}

export default SalesTipItem;
