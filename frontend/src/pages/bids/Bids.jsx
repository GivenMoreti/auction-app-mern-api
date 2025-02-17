
import BidTile from "../../components/BidTile";
import { useBidStore } from "../../store/Bid";
import { useEffect } from "react";

export default function Bids() {
  const { bids, getAllBids } = useBidStore();

  useEffect(() => {
    getAllBids(); 
  }, []);

    console.log(bids)
  return (
      <div className="max-w-full p-2 m-4">
            <h1 className="font-bold text-3xl text-blue-700 p-2 text-start">Your Bids</h1>
      <div className="flex flex-col row-span-1">
        {bids.length > 0 ? (
          bids.map((item) => <BidTile key={item._id} item={item} />)
        ) : (
          <h1>No bids</h1>
        )}
      </div>
    </div>
  );
}
