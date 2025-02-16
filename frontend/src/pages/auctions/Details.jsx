import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuctionStore } from "../../store/Auction";
import CustomBtn from "../../components/CustomBtn";

export default function Details() {
  const { id } = useParams();
  const { getAuctionById } = useAuctionStore();
  const [auction, setAuction] = useState(null); // State to store auction details

  useEffect(() => {
    const fetchAuction = async () => {
      const response = await getAuctionById(id); // Await the response from store method
      if (response.success) {
        setAuction(response.data); // Set the fetched auction data
      } else {
        console.error(response.message); // Handle any errors
      }
    };
    fetchAuction(); // Call the async function
  }, [id, getAuctionById]);

  if (!auction) {
    return <div>Loading auction details...</div>;
  }
  console.log("Auctions", auction);
  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-blue-600 text-center mb-6">
        Details of an Auction
      </h2>
      <div className="p-2 shadow m-2 flex justify-around">
        <div>
          <img
            className="rounded"
            src={auction.item.imgUrl}
            alt={auction.title}
            style={{ width: "300px", height: "auto" }}
          />
        </div>
        <div className="">
          <h1 className="text-2xl font-bold text-blue-800">
            {auction.item.title}
          </h1>
          <p className="font-bold text-red-600 text-xl line-through ">
            From R{auction.item.price}
          </p>
          <p className="font-bold text-blue-800 text-2xl">
            To R{auction.auctionPrice}
          </p>
          <p className="font-bold text-gray-600 mb-2">
            {auction.item.isAvailable ? "Available now" : "Not Available"}
          </p>
          <p className="truncate overflow-ellipsis mb-4">
            {auction.item.description}
          </p>

          <span className="flex flex-row space-x-1 px-2 mb-2">
            {auction.item.tags.map((tag, index) => (
              <p
                className=" bg-blue-500 p-2 text-white font-bold rounded-3xl shadow"
                key={index}
              >
                {tag}
              </p>
            ))}
          </span>

          <p className="text-gray-600 mb-2">
            Created {new Date(auction.dateCreated).toUTCString()}
          </p>
          <div className="mb-4">
            <CustomBtn title="Bid now" />
          </div>
        </div>
      </div>
    </div>
  );
}
