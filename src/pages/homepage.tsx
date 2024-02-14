import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useImageBuffer from "@/hooks/useImageBuffer";
import axios from "../../axiosConfig";

import { AvatarProfile } from "@/components/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type decodedTokenType = {
  username: string;
  id: string;
};

const Home = () => {
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetching user's name
        const token = localStorage.getItem("token");
        const decodedToken: decodedTokenType | null = token
          ? jwtDecode(token)
          : null;
        setName(decodedToken?.username as string);
        const idUser = decodedToken?.id;
        // Fetching user's profile image
        const imageResponse = await axios.get(`profileImage/${idUser}`, {
          responseType: "arraybuffer",
        });
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const base64Image = useImageBuffer(imageResponse.data);
        setImageData(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-[3rem] ">
      <div className="flex gap-[1rem]">
        {!loading ? (
          <>
            <AvatarProfile image={imageData} name={name} />
            <div>
              <p className="text-[0.8rem] font-bold">Bem vindo!</p>
              <p className="text-[1.2rem]">{name}</p>
            </div>
          </>
        ) : (
          <>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
