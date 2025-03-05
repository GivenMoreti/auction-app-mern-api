import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuctionStore } from "../../store/Auction";
import CustomBtn from "../../components/CustomBtn";
import Modal from "../../components/Modal";

export default function Details() {
  const { id } = useParams();
  const { getAuctionById } = useAuctionStore();
  const [auction, setAuction] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchAuction = async () => {
      const response = await getAuctionById(id);
      if (response.success) {
        setAuction(response.data);
      } else {
        console.error(response.message);
      }
    };
    fetchAuction();
  }, [id, getAuctionById]);

  if (!auction) return <div className="text-center py-10 text-blue-500 text-xl">Loading auction details...</div>;

  function handleOpenModal() {
    setOpenModal(true);
 

  }
  return (
    <div className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen">
      <h2 className="text-4xl font-bold text-blue-700 text-center mb-8 drop-shadow-md">Auction Details</h2>
      <div className="p-4 bg-white shadow-2xl rounded-2xl flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 transition-transform transform hover:scale-105">
        <img className="rounded-xl w-80 h-auto object-cover shadow-lg" src={auction.item.imgUrl} alt={auction.item.title} />
        <div className="flex flex-col justify-between p-4">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">{auction.item.title}</h1>
          <p className="text-xl font-semibold text-red-500 line-through mb-1">From R{auction.item.price}</p>
          <p className="text-2xl font-bold text-green-600 mb-2">To R{auction.auctionPrice}</p>
          {/* <p className="text-lg text-gray-700 mb-2">{auction.item.isAvailable ? "Available now" : "Not Available"}</p> */}
          <p className="text-gray-600 mb-4 leading-relaxed">{auction.item.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {auction.item.tags.map((tag, index) => (
              <span key={index} className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full shadow-md hover:bg-blue-600">{tag}</span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-4">Created on {new Date(auction.dateCreated).toLocaleDateString()}</p>
          <CustomBtn title="Bid Now" onClick={()=>handleOpenModal(auction.item.id)} className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 transition-colors duration-300" />
        </div>
      </div>

      {/* modal */}
         {openModal && (
        <Modal 
          item={auction.item} 
          key={auction.item.id} 
          onClose={() => setOpenModal(false)} 
        />
      )}
    </div>
  );
}
