import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBidStore } from '../store/Bid';

export default function Modal({ item, onClose }) {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const [bid, setBid] = useState({
    auction: id,
    bidPrice: '',
    bidBy: '67518bb78289a835637b9bb0'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBid({ ...bid, [name]: value });
  };

  const { createBid } = useBidStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { success, message: responseMessage } = await createBid(bid);
    if (success) {
      setMessage("Bid created successfully!");
    } else {
      setMessage(responseMessage || "Error creating bid.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Place a Bid</h2>
        {message && <p className="mb-2 text-green-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input type="text" name="auction" value={id} readOnly className="p-2 border rounded" />
          <input type="number" name="bidPrice" value={bid.bidPrice} onChange={handleChange} placeholder="Bid Price" className="p-2 border rounded" required />
          <input type="text" name="bidBy" value={bid.bidBy} onChange={handleChange} placeholder="Your Name" className="p-2 border rounded"/>
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit Bid</button>
          </div>
        </form>
      </div>
    </div>
  );
}