import { useProfileStore } from "../../store/Profile";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function UserProfile() {
  const { getProfileById } = useProfileStore();
  const { id } = useContext(AuthContext);

  const [userProfile, setProfile] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProfile = async () => {
        try {
          const response = await getProfileById(id);
          if (response.success) {
            setProfile(response.data);
          } else {
            console.error(response.message);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };
      fetchProfile();
    }
  }, [id]);

  console.log(userProfile)
  return (
    <div className="max-w-full p-2 m-4">
      <h1 className="text-3xl p-2 text-start">Your Profile</h1>
      <div className="flex flex-col row-span-1">
        <h1>Email: {userProfile?.user?.email || "Loading..."}</h1>
      </div>
    </div>
  );
}
