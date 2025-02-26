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
        <h1>See all the auctions</h1>
      </div>
      <div className="grid p-1 m-2 gap-2 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4">
        {auctions.length > 0 ? (
          auctions.map((item) => <AuctionTile key={item._id} item={item} />)
        ) : (
          <h1>No auctions</h1>
        )}
      </div>
    </div>
  );
}
