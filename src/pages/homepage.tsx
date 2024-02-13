import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useImageBuffer from "@/hooks/useImageBuffer";
import axios from "../../axiosConfig";

const Home = () => {
  const [name, setName] = useState("");
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching user's name
        const token = localStorage.getItem("token");
        const decodedToken = token ? jwtDecode(token) : null;
        setName(decodedToken?.username);
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
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p>Home</p>
      <p>Olá, {name}</p>
      {imageData && <img src={imageData} alt="User profile" />}
    </div>
  );
};

export default Home;
