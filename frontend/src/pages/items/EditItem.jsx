import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useItemStore } from "../../store/Item";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";

export default function EditItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, updateItem } = useItemStore();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await getItemById(id);
      if (response.success) {
        setItem(response.data);
      } else {
        console.error(response.message);
      }
    };
    fetchItem();
  }, [id, getItemById]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const response = await updateItem(item);
    if (response.success) {
      console.log("Item updated successfully");
    } else {
      console.error(response.message);
    }
  };

  if (!item) return <div className="text-center py-10 text-blue-500 text-xl">Loading item details...</div>;

  console.log(item)
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Editing item with id {id}</h1>
      
      {/* Image URL Input */}
      <CustomInput
        type="text"
        name="imgUrl"
        placeholder="Enter image URL"
        helperText="Image URL"
        label="Image URL"
        value={item.imgUrl}
        onChange={handleChange}
      />

      {/* Auction Price Input */}
      <CustomInput
        type="text"
        name="price"
        placeholder="Enter starting price"
        helperText="Starting Price"
        label="Starting Price"
        value={item.price}
        onChange={handleChange}
      />

      {/* Title Input */}
      <CustomInput
        type="text"
        name="title"
        placeholder="Enter item title"
        helperText="Item Title"
        label="Item Title"
        value={item.title}
        onChange={handleChange}
      />

      {/* Description Input */}
      <CustomInput
        type="text"
        name="description"
        placeholder="Enter item description"
        helperText="Item Description"
        label="Item Description"
        value={item.description}
        onChange={handleChange}
      />

      {/* Save Button */}
      <CustomBtn title="Save" onClick={handleSave} />
      <CustomBtn title="Cancel" onClick={()=>navigate("/items")} />
    </div>
  );
}
