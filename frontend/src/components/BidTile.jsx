/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CustomBtn from "./CustomBtn";

export default function BidTile({ item }) {
  const navigate = useNavigate();
  return (
    <div className="p-4" key={item?._id}>
      <div className="flex flex-col md:flex-row shadow-lg rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
        <div className="md:w-1/3 p-2">
          <img
            src={item.auction.item.imgUrl}
            alt={item.auction.item.title}
            className="w-full h-48 object-cover rounded-xl"
          />
        </div>
        <div className="md:w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-blue-800 mb-2">{item.auction.item.title}</h2>
            <p className="text-xl text-gray-700 mb-1">Bid Price: <span className="font-semibold">R{item.bidPrice}</span></p>
            {item.bidBy.map((user) => (
              <p key={user.id} className="text-gray-500 mb-1">Bid by: {user.username}</p>
            ))}
            <p className="text-sm text-gray-400 mb-2">Updated at: {new Date(item.updatedAt).toLocaleString()}</p>
          </div>
          <CustomBtn onClick={()=>navigate(`/`)} title={"Go to Auction"} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"/>
        </div>
      </div>
    </div>
  );
}
