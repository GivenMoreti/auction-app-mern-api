import { useNavigate } from "react-router-dom";
import CustomBtn from "./CustomBtn";
import { FaCalendarAlt } from "react-icons/fa"; // Optional: Use an icon for dates
import {useAuctionStore} from "../store/Auction";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
/* eslint-disable react/prop-types */

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return "Invalid date";
  return date.toLocaleString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
};

export default function AuctionTile({ item }) {
  const { deleteAuction } = useAuctionStore();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Extract data for better readability and default values
  const { imgUrl, title, price } = item?.item || {};
  const { auctionPrice, startDate, endDate, _id,postedBy } = item || {};

  // delete auction
  async function handleDeleteAuction(id) {
    const { success, message:responseMessage } = await deleteAuction(id);

    if (success) {
      setMessage("Auction deleted successfully!");
    } else {
       setMessage(responseMessage || "Error deleting an auction.");
    }
  }
   { message && <p className="mb-2 text-green-500">{message}</p> }
  
  return (
    <div key={_id} className="shadow-lg hover:shadow-xl transition-shadow duration-200 rounded-md p-4 bg-white hover:bg-gray-50 cursor-pointer">
      <div className="mb-4">
        <img src={imgUrl} alt={title || 'Auction Item'} className="w-full h-48 object-cover rounded-lg" />
      </div>
      <p className="text-gray-500">Posted by @{postedBy.username}</p>
      <h2 className="text-3xl font-bold">{title || 'Auction Item'}</h2>
      <p className="text-gray-600 text-xl">Starting Price: R{price || '0.00'}</p>
      <h3 className="text-red-600 font-bold mt-2 text-2xl">Auctioned: R{auctionPrice || '0.00'}</h3>

      <div className="flex justify-between text-gray-500 text-sm mt-4">
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2" />
          <span>Start: {formatDate(startDate)}</span>
        </div>
        <div className="flex items-center">
          <FaCalendarAlt className="mr-2" />
          <span>End: {formatDate(endDate)}</span>
        </div>
      </div>

      <div className="mt-4">
        <CustomBtn title="See details" onClick={() => navigate(`/auctions/${_id}`)} />
     
        <CustomBtn title={<RiDeleteBinLine />} onClick={() => handleDeleteAuction(_id)} />
      </div>
    </div>
  );
}
