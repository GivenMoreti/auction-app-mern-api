/* eslint-disable react/prop-types */
import CustomBtn from "./CustomBtn";

export default function ProfileTile({ profile }) {
  return (
    <div id={profile?.id} className="p-2 bg-slate-100 m-2 shadow">
      <img style={{height:"100px",width:"100px",borderRadius:"50px"}} src="https://images.unsplash.com/vector-1740738536404-c36db193ce34?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      <h1  className="text-gray-600"> {profile.user?.email}</h1>
      <h1  className="text-gray-500">role {profile.user?.role || "user"} </h1>
      <div>
        <h1 className="font-bold text-2xl">Bids</h1>
        {profile.bids.length > 0 ? (
          profile.bids.map((profileBid) => (
            <h1 key={profileBid.id}>{profileBid.name}</h1>
          ))
        ) : (
          <h1 className="text-gray-500">No Bids yet</h1>
        )}
      </div>
      <div>
        <h1 className="font-bold text-2xl">Auctions</h1>
        {profile.auctions.length > 0 ? (
          profile.auctions.map((profileAuction) => (
            <h1 key={profileAuction.id}>{profileAuction.name}</h1>
          ))
        ) : (
          <h1 className="text-gray-500">No Auctions yet</h1>
        )}
        <CustomBtn title="Update" />
         <CustomBtn title="Delete"/>
      </div>
    </div>
  );
}
