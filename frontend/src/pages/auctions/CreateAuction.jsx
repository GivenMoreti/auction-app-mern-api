import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { useAuctionStore } from "../../store/Auction";
import CustomBtn from "../../components/CustomBtn";

export default function CreateAuction() {
  const [newAuction, setNewAuction] = useState({
    item: "",
    auctionPrice: "",
    startDate: "",
    endDate: "",
  });

  const { createAuction } = useAuctionStore();

  const handleAddAuction = async () => {
    const { success, message } = await createAuction(newAuction);

    console.log({ "success: ": success, "Message: ": message });
  };
  return (
    <div>
      <div>
        <h1>Create A New Auction</h1>
        <div>
          {/* model field */}
          <CustomInput
            type={"text"}
            name="item"
            placeholder="Enter item "
            helperText={"Item"}
            label={"Item"}
            value={newAuction.item}
            onChange={(e) =>
              setNewAuction({ ...newAuction, item: e.target.value })
            }
          />

          <CustomBtn onClick={handleAddAuction} title="Create"/>
        </div>
      </div>
    </div>
  );
}
