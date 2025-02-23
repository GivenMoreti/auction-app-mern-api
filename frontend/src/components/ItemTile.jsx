/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CustomBtn from "./CustomBtn";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { GiMoneyStack } from "react-icons/gi";
import { useState } from "react";
import {useItemStore} from "../store/Item";

export default function ItemTile({ item }) {

  const { deleteBid } = useItemStore();
  const [message, setMessage] = useState("");

  async function handleDelete(id) {
    console.log(id);
    const { success,message: responseMessage } = await deleteBid(id);

    if (success) {
      setMessage("Bid deleted successfully!");
    } else {
       setMessage(responseMessage || "Error deleting a bid.");
    }
  }

  const navigate = useNavigate();
  
  { message && <p className="mb-2 text-green-500">{message}</p> }
  
  return (
    <div
      key={item?._id}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 w-full mx-auto"
    >
      {/* Image Section */}
      <div className="w-full h-60 mb-4 overflow-hidden rounded-lg">
        <img
          src={item.imgUrl}
          alt={item.title}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Title Section */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        {item.title}
      </h1>

      {/* Price Section */}
      <span className="text-xl font-extrabold text-green-600 mb-2 flex justify-between">
        <p>R{item.price}</p>
        <p className="text-3xl">
          <GiMoneyStack />
        </p>
      </span>

      {/* Description Section */}
      <p className="text-gray-600 text-sm mb-4">{item.description}</p>

      {/* Tags Section */}
      <div className="flex flex-wrap gap-2 mb-4">
        {item.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-500 font-bold text-white text-sm px-4 py-2 rounded-full shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Button Section */}
      <CustomBtn
        title="Auction Item"
        onClick={() => navigate(`/create-auction/${item?._id}`)}
        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
      />
      <CustomBtn
        title={<FiEdit />}
        onClick={() => navigate(`/items/${item?._id}`)}
      />
      <CustomBtn title={<RiDeleteBinLine />} onClick={() => {handleDelete(item._id)}} />
    </div>
  );
}
