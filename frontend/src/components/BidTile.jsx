/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CustomBtn from "./CustomBtn";
import { FaUser, FaClock, FaTag } from "react-icons/fa";

export default function BidTile({ item }) {
  const navigate = useNavigate();
  const { imgUrl, title } = item.auction?.item || {};
  const formattedDate = new Date(item.updatedAt).toLocaleString();

  return (
    <div className="p-4 w-full" key={item.auction?.item?.id}>
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-5 top-5 bottom-0 w-1 bg-gray-300 rounded-full"></div>

        {/* Timeline Dot */}
        <div className="relative z-10 flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full shadow-lg">
            <FaTag size={20} />
          </div>
          <div className="w-full">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 p-5">
              <div className="flex flex-col md:flex-row items-center md:items-start">
                {/* Image Section */}
                <div className="md:w-1/3 p-2">
                  <img
                    src={imgUrl}
                    alt={title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </div>

                {/* Details Section */}
                <div className="md:w-2/3 p-4">
                  <h2 className="text-2xl font-extrabold text-blue-800 mb-2">
                    {title}
                  </h2>
                  <p className="text-xl text-gray-700 mb-2 flex items-center">
                    <FaTag className="mr-2 text-blue-600" /> 
                    Bid Price: <span className="font-semibold ml-2">R{item.bidPrice}</span>
                  </p>

                  {/* {item.bidBy.map((user) => (
                    <p key={user.id} className="text-gray-600 flex items-center mb-1">
                      <FaUser className="mr-2 text-gray-500" /> 
                      Bid by: {user.username}
                    </p>
                  ))} */}
                  <p>{item.bidBy }</p>
                  <p className="text-sm text-gray-500 flex items-center mt-2">
                    <FaClock className="mr-2 text-gray-400" />
                    Updated at: {formattedDate}
                  </p>

                  {/* Action Button */}
                  <div className="mt-4">
                    <CustomBtn
                      onClick={() => navigate(`/`)}
                      title={"Go to Auction"}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
}
