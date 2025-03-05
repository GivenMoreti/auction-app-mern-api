import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useAuctionStore } from "../../store/Auction";
import CustomBtn from "../../components/CustomBtn";
import CustomDatePicker from "../../components/CustomDatePicker"; // Assuming you have a custom date picker component
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import {useNavigate} from "react-router-dom";

export default function CreateAuction() {
  const { id } = useParams();
  const {user} = useContext(AuthContext);

  console.log(user);
  const [newAuction, setNewAuction] = useState({
    item: id,
    auctionPrice: "",
    startDate: "",
    endDate: "",
    postedBy:user._id,
  
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { createAuction } = useAuctionStore();
  const navigate = useNavigate();
  const handleAddAuction = async () => {
    if (
      !newAuction.item ||
      !newAuction.auctionPrice ||
      !newAuction.startDate ||
      !newAuction.endDate ||
      !newAuction.postedBy
    ) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);
    const { success, message: responseMessage } = await createAuction(
      newAuction
    );
    setLoading(false);

    if (success) {
      setMessage("Auction created successfully!");
      navigate("/");
    } else {
      setMessage(responseMessage || "Error creating auction.");
    }
  };

  // console.log("id",id)
  return (
    <div className="p-4 max-w-md mx-auto justify-center flex flex-col">
      <h1 className="text-2xl font-bold text-center mb-6">
        Create A New Auction
      </h1>

      <div className="space-y-4">
        {/* Item Field */}
        <CustomInput
          type="text"
          name="item"
          placeholder="Enter item"
          helperText="Item"
          label="Item"
          value={id}
          disabled
          onChange={(e) =>
            setNewAuction({ ...newAuction, item: e.target.value })
          }
        />

        {/* Auction Price Field */}
        <CustomInput
          type="number"
          name="auctionPrice"
          placeholder="Enter auction price"
          helperText="Auction Price"
          label="Auction Price"
          value={newAuction.auctionPrice}
          onChange={(e) =>
            setNewAuction({ ...newAuction, auctionPrice: e.target.value })
          }
        />

        {/* Start Date Field */}
        <div className="flex  flex-row gap-4">
          <CustomDatePicker
            label="Start Date"
            selected={newAuction.startDate}
            onChange={(date) =>
              setNewAuction({ ...newAuction, startDate: date })
            }
          />

          {/* End Date Field */}
          <CustomDatePicker
            label="End Date"
            selected={newAuction.endDate}
            onChange={(date) => setNewAuction({ ...newAuction, endDate: date })}
          />
        </div>

        {/* Error or Success Message */}
        {message && (
          <p className="text-center text-sm text-red-600">{message}</p>
        )}

        {/* Create Auction Button */}
        <div className="flex justify-center">
          <CustomBtn
            title={loading ? "Creating..." : "Create Auction"}
            onClick={handleAddAuction}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}
