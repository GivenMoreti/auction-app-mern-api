import AuctionTile from "../../components/AuctionTile";
import { useAuctionStore } from "../../store/Auction";
import { useEffect } from "react";

export default function Auction() {
  const { auctions, getAllAuctions } = useAuctionStore();

  useEffect(() => {
    getAllAuctions(); 
  }, []);

  return (
    <div className="max-w-full p-2 m-4">
      <div>
        <h1 className="text-start text-3xl">See all the auctions</h1>
      </div>
      <div className="grid p-1 m-2 gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4">
        {auctions.length > 0 ? (
          auctions.map((item) => <AuctionTile key={item._id} item={item} />)
        ) : (
           <img style={{height:"300px",width:"300px",marginLeft:"auto",marginRight:"auto"}} src="https://plus.unsplash.com/premium_vector-1721386085379-8df3c43a062d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NDA0fGVufDB8fDB8fHww" />
        )}
      </div>
    </div>
  );
}
