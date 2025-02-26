import { Link } from "react-router-dom";
import ItemTile from "../../components/ItemTile";
import { useItemStore } from "../../store/Item";
import { useEffect } from "react";
import { IoAdd } from "react-icons/io5";

export default function Bids() {
  const { items, getAllItems } = useItemStore();

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="max-w-full p-4 m-4">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl text-blue-700 p-2 text-start mb-6">
          Auction your items for value.
        </h1>
        {/* add new item button*/}
        <Link
          to="/add-new-item"
          className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95"
        >
          <IoAdd className="text-2xl" />
          <span>Add New Item</span>
        </Link>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-2">
        {items.length > 0 ? (
          items.map((item) => <ItemTile key={item?._id} item={item} />)
        ) : (
          <div className="col-span-full text-center p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">
              No items found
            </h2>
            <p className="text-gray-500">Start adding items to your auction!</p>
          </div>
        )}
      </div>
    </div>
  );
}
