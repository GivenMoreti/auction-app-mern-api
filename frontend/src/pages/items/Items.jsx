
import ItemTile from "../../components/ItemTile";
import { useItemStore } from "../../store/Item";
import { useEffect } from "react";

export default function Bids() {
  const { items, getAllItems } = useItemStore();

  useEffect(() => {
    getAllItems(); 
  }, []);

    console.log(items)
  return (
      <div className="max-w-full p-2 m-4">
            <h1 className="font-bold text-3xl text-blue-700 p-2 text-start">Your Items</h1>
      <div className="flex flex-col row-span-1">
        {items.length > 0 ? (
          items.map((item) => <ItemTile key={item._id} item={item} />)
        ) : (
          <h1>No items</h1>
        )}
      </div>
    </div>
  );
}
