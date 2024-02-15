import { Menu, Plus, Settings, User, SunMoon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

import { useNavigate } from "react-router-dom";

export function MenuButton() {
  const { setTheme, theme } = useTheme();
  const navigate = useNavigate();
  function SignOut() {
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="shadow-2xl border-[1px] w-56 mr-4">
        <DropdownMenuGroup className="flex flex-col gap-[0.4rem] ">
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span className="text-[1rem]">Novo evento</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span className="text-[1rem]">Editar perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span className="text-[1rem]">Configuração</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <SunMoon className="mr-2 h-4 w-4" />
            <span className="text-[1rem]">Mudar Tema</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={SignOut}>
            <SunMoon className="mr-2 h-4 w-4" />
            <span className="text-[1rem]">Sair</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
