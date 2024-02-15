import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import useImageBuffer from "@/hooks/useImageBuffer";
import axios from "../../axiosConfig";
import { Link } from "react-router-dom";

import { AvatarProfile } from "@/components/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CalendarDays, Send, Youtube, DollarSign } from "lucide-react";
import { MenuButton } from "@/components/menu";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="pt-[2rem]">
      <div className="px-[1rem] pt-[3rem] mb-[2rem] flex justify-between ">
        <div className="flex gap-[1rem] items-center">
          {!loading ? (
            <>
              <AvatarProfile image={imageData} name={name} />
              <div className="flex flex-col gap-1">
                <p className="text-[0.9rem] leading-5 font-bold">Bem vindo!</p>
                <p className="text-[1.2rem] leading-5 font-medium">{name}</p>
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
        <div className="flex gap-[0.5rem]">
          <Button variant="ghost" size="icon">
            <CalendarDays className="h-9 w-8" />
          </Button>
          <MenuButton />
        </div>
      </div>
      <div className="flex px-[1rem] gap-[1rem]">
        <Button
          variant={"ghost"}
          className="flex flex-col gap-[1rem] h-24 bg-primary-foreground w-[5.75rem] py-4"
        >
          <Send className="h-6 w-8" />
          <span className="text-[0.8rem] font-light">Telegram </span>
        </Button>
        <Link to="https://www.youtube.com/@icnvqueimados2380">
          <Button
            variant={"ghost"}
            className="flex flex-col gap-[1rem] h-24 bg-primary-foreground w-[5.75rem]"
          >
            <Youtube className="h-6 w-8" />
            <span className="text-[0.8rem] font-light">Youtube </span>
          </Button>
        </Link>
        <Button
          variant={"ghost"}
          className="flex flex-col gap-[1rem] h-24 bg-primary-foreground w-[5.75rem]"
        >
          <DollarSign className="h-6 w-8" />
          <span className="text-[0.8rem] font-light">Dízimo </span>
        </Button>
      </div>
      <div className="pt-[2rem] pl-[1rem] mb-2">
        <p className="text-[0.8rem] font-light opacity-70">PRÓXIMOS EVENTOS</p>
      </div>
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup,
        even in the royal toilet. The king was furious, but he couldn't seem to
        stop Jokester. And then, one day, the people of the kingdom discovered
        that the jokes left by Jokester were so funny that they couldn't help
        but laugh. And once they started laughing, they couldn't stop.
      </ScrollArea>
    </div>
  );
};

export default Home;
