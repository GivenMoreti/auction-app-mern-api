
import BidTile from "../../components/BidTile";
import { useBidStore } from "../../store/Bid";
import { useEffect } from "react";

export default function Bids() {
  const { bids, getAllBids } = useBidStore();

  useEffect(() => {
    getAllBids(); 
  }, []);

 
  return (
      <div className="max-w-full p-2 m-4">
            <h1 className="text-3xl p-2 text-start">Your bids</h1>
      <div className="flex flex-col row-span-1">
        {bids.length > 0 ? (
          bids.map((item) => <BidTile key={item._id} item={item} />)
        ) : (
            // <h1>No bids</h1>
            <img style={{height:"300px",width:"300px",marginLeft:"auto",marginRight:"auto"}} src="https://plus.unsplash.com/premium_vector-1721386085379-8df3c43a062d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NDA0fGVufDB8fDB8fHww" />
        )}
      </div>
    </div>
  );
}
