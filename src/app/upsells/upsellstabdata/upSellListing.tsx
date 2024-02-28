"use client";
import handleApiCallFetch from "@/components/handleApiCallFetch";
import { envConfig } from "@/utility/environment";
import { useEffect, useState } from "react";
import Loader from "../loading";
interface UpSellListingProps {
  upsellid: number; // Assuming upsellid is a string, adjust the type accordingly
}

export interface ListingInfo {
  address: string;
  currencyCode: string;
  externalListingName: string;
  guestsIncluded: number;
  id: number;
  listingId: number;
  name: string;
  price: number;
  priceForExtraPerson: number;
}

const UpSellListing: React.FC<UpSellListingProps> = ({ upsellid }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAssociatedListing(upsellid);
  }, []);

  const [listingData, setListingData] = useState<ListingInfo[]>([]);

  const renderUpSellListing = listingData?.map((data: ListingInfo) => {
    return (
      <tr
        key={data.id}
        className="grid grid-cols-12 bg-white border-b-2 py-2 px-4"
      >
        <td className=" col-span-2 text-start text-gray-600">#{data.id}</td>
        <td className="col-span-8 text-start">{data.name}</td>
        <td className="col-span-2 text-start text-gray-600">All Rentals</td>
      </tr>
    );
  });

  const fetchAssociatedListing = async (id: number) => {
    const apiUrl = `${envConfig.backendUrl}/upsell/listing?upSellId=${id}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    setIsLoading(true);
    const result: any = await handleApiCallFetch(apiUrl, params);
    setListingData(result.data);
    setIsLoading(false);
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-auto">
          <div className="rounded-md text-sm py-2 px-2 border shadow-md">
            <p className="font-semibold py-2 ">Attached rentals</p>
            <table className="min-w-full overflow-x-auto">
              <thead>
                <tr className="grid grid-cols-12 px-4 py-2 bg-slate-200 rounded-md">
                  <th className="col-span-2 text-start">Property Id</th>
                  <th className="col-span-8 text-start">Property Name</th>
                  <th className="col-span-2 text-start">Rentals</th>
                </tr>
              </thead>
              <tbody className="text-sm">{renderUpSellListing}</tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpSellListing;
