import ItemTile from "../../components/ItemTile";
import { useItemStore } from "../../store/Item";
import { useEffect } from "react";

export default function Bids() {
  const { items, getAllItems } = useItemStore();

  useEffect(() => {
    getAllItems();
  }, []);

  return (
    <div className="max-w-full p-4 m-4">
      <h1 className="font-bold text-3xl text-blue-700 p-2 text-start mb-6">Your Items</h1>
      
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-2">
        {items.length > 0 ? (
          items.map((item) => <ItemTile key={item?._id} item={item} />)
        ) : (
          <div className="col-span-full text-center p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">No items found</h2>
            <p className="text-gray-500">Start adding items to your auction!</p>
          </div>
        )}
      </div>
    </div>
  );
}
