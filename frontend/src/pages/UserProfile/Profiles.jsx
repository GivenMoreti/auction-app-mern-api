import { useEffect } from 'react'
import { useProfileStore } from '../../store/Profile';
import ProfileTile from '../../components/ProfileTile';


export default function Profiles() {
   
    const { profiles, getAllProfiles} = useProfileStore();
    useEffect(() => {
        getAllProfiles();
    }, []);

    console.log(profiles);
  return (
     <div className="max-w-full p-2 m-4">
                <h1 className="text-3xl p-2 text-start">All the Profiles</h1>
          <div className="flex flex-col row-span-1">
            {profiles.length > 0 ? (
              profiles.map((profile) => <ProfileTile key={profile._id} profile={profile} />)
            ) : (
                // <h1>No bids</h1>
                <img style={{height:"300px",width:"300px",marginLeft:"auto",marginRight:"auto"}} src="https://plus.unsplash.com/premium_vector-1721386085379-8df3c43a062d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8NDA0fGVufDB8fDB8fHww" />
            )}
          </div>
        </div>
  )
}
