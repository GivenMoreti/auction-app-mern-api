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
        <h1 className="text-3xl p-2 text-start mb-6">
          Auction your valued items for value.
        </h1>
        {/* add new item button*/}
        <Link
          to="/add-new-item"
          className="flex items-center justify-center gap-1 px-2 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-md transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95"
        >
          <IoAdd className="text-3xl font-bold" />
          <span>New Item</span>
        </Link>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-2">
        {items.length > 0 ? (
          items.map((item) => <ItemTile key={item?._id} item={item} />)
        ) : (
          <div className="col-span-full text-center p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">
               <img style={{height:"300px",width:"300px",marginLeft:"auto",marginRight:"auto"}} src="https://plus.unsplash.com/premium_vector-1721386085379-8df3c43a062d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NDA0fGVufDB8fDB8fHww" />
            </h2>
            <p className="text-gray-500">Start adding items to your auction!</p>
          </div>
        )}
      </div>
    </div>
  );
}
