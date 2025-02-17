import { Link } from "react-router-dom";


export default function Nav() {
  return (
      <div className="bg-blue-500 p-4 flex justify-between">
          <Link to={"/"} className="font-bold  text-2xl text-white">
              Auction Huub
          </Link>
          <div className="flex justify-between gap-2">
            

               <Link to={"/bids"} className="font-bold  text-xl text-white hover:text-gray-200">
              Bids
        </Link>
         <Link to={"/items"} className="font-bold  text-xl text-white hover:text-gray-200">
              Items
            </Link>
          </div>
         
    </div>
  )
}
