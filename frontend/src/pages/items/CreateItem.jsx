import { useState } from "react";
import axios from "axios";  // Import axios
import CustomBtn from "../../components/CustomBtn";
import CustomInput from "../../components/CustomInput";
import { useItemStore } from "../../store/Item";

export default function CreateItem() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newItem, setNewItem] = useState({
    imgUrl: "",
    price: "",
    title: "",
    description: "",
    tags: "",
  });

  const { createItem } = useItemStore();

  // Function to upload image to Cloudinary
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");  // Set in Cloudinary

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dhjwnnc6y/image/upload`,
        formData
      );
      return res.data.secure_url; // Cloudinary image URL
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };

  const handleAddItem = async () => {
    if (
      !newItem.imgUrl ||
      !newItem.price ||
      !newItem.title ||
      !newItem.description ||
      !newItem.tags
    ) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);

    // Save item in database
    const { success, message: responseMessage } = await createItem(newItem);
    setLoading(false);

    if (success) {
      setMessage("Item created successfully!");
    } else {
      setMessage(responseMessage || "Error adding an Item.");
    }
  };

  return (
    <div className="max-w-full p-4 m-4">
      <h1 className="flex justify-center font-bold text-red-600 text-3xl">
        Add New Item
      </h1>

      <div>
        {message && <p className="text-center text-sm text-red-600">{message}</p>}
      </div>

      {/* Image Input */}
      <CustomInput
        type="file"
        name="imgUrl"
        placeholder="Add Item Image"
        helperText="Add Item Image"
        label="Item Image"
        onChange={async (e) => {
          const file = e.target.files[0];
          if (file) {
            setLoading(true);
            const imageUrl = await uploadImage(file);
            setLoading(false);
            if (imageUrl) {
              setNewItem({ ...newItem, imgUrl: imageUrl });
            } else {
              setMessage("Error uploading image to Cloudinary.");
            }
          }
        }}
      />

      {/* Title Input */}
      <CustomInput
        type="text"
        name="title"
        placeholder="Title"
        helperText="Title"
        label="Title"
        value={newItem.title}
        onChange={(e) =>
          setNewItem({ ...newItem, title: e.target.value })
        }
      />

      {/* Price Input */}
      <CustomInput
        type="number"
        name="price"
        placeholder="Enter item price"
        helperText="Item Price"
        label="Price"
        value={newItem.price}
        onChange={(e) =>
          setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })
        }
      />

      {/* Description Input */}
      <CustomInput
        type="text"
        name="description"
        placeholder="Enter item description"
        helperText="Item Description"
        label="Description"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />

      {/* Tags Input */}
      <CustomInput
        type="text"
        name="tags"
        placeholder="Enter item tags"
        helperText="Item Tags"
        label="Tags"
        value={newItem.tags}
        onChange={(e) =>
          setNewItem({ ...newItem, tags: e.target.value })
        }
      />

      {/* Submit Button */}
      <CustomBtn
        onClick={handleAddItem}
        title={loading ? "Creating..." : "Create Item"}
      />
    </div>
  );
}
