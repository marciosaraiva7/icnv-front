import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useInitialsName } from "../hooks/useInitialsName";
interface AvatarProps {
  image: string;
  name: string;
}

export function AvatarProfile({ image, name }: AvatarProps) {
  const initialName = useInitialsName(name);
  return (
    <Avatar>
      <AvatarImage src={image} alt="User profile" />
      <AvatarFallback>{initialName}</AvatarFallback>
    </Avatar>
  );
}
