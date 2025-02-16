import { useNavigate } from "react-router-dom";
import CustomBtn from "./CustomBtn";

/* eslint-disable react/prop-types */
export default function AuctionTile({ item }) {
    const navigate = useNavigate();
  return (
      <div key={item.id} className="shadow gap-1 p-2 bg-slate-50">
          <div className="">
              <img src={item.item.imgUrl} className="rounded" />
              <h1 className="text-xl font-bold text-blue-500">{item.item.title}</h1>
              <p className="text-gray-500">R{item.item.price}</p>
              <h1 className="text-red-600 font-bold">Auctioned at: R{item.auctionPrice}</h1>
          </div>

      <div className="flex flex-row justify-between">
        <p className="truncate text-gray-500">Start: {new Date(item?.startDate).toUTCString().substring(0,16)}</p>
        <p className="truncate text-gray-500">End: {new Date(item?.endDate).toUTCString().substring(0,16)}</p>
          </div>
          <CustomBtn title="See details" onClick={()=>navigate(`/auctions/${item._id}`)}/>
    </div>
  );
}
