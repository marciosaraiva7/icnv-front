/* eslint-disable @typescript-eslint/no-unused-vars */
import IcnvCover from "../assets/images/icnv-cover.jpg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import AnimatedPage from "@/components/animate-page";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit() {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    try {
      const response = await fetch(
        "https://icnv-backend.onrender.com/api/login",
        requestOptions
      );
      if (!response.ok) {
        toast.error("Erro desconhecido", {
          description: "Por favor, tente novamente mais tarde.",

          action: {
            label: "Fechar",
            onClick: () => console.log("Undo"),
          },
        });
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      localStorage.setItem("token", data);
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Houve um erro na requisição:", error);
      // O servidor respondeu com um status de erro (fora do intervalo 2xx)

      toast.error("Erro desconhecido", {
        description: "Por favor, tente novamente mais tarde.",

        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
      });
    } finally {
      setLoading(false);
    }
  }
  function NavToCreateAccount() {
    navigate("/create-account");
  }
  return (
    <AnimatedPage>
      <div>
        <img src={IcnvCover} className="z-[-10]" />
        <div className="flex flex-col items-start relative w-full bg-background rounded-t-[3.75rem] rounded-r-[3.75rem] mt-[-5rem] pt-[3.625rem] px-[2.25rem]">
          {/* <ModeToggle /> */}
          <h1 className="font-bold text-[1.875rem] leading-[2.25rem] mb-[3.438rem]">
            Acessar conta
          </h1>
          <form
            className="flex flex-col items-start mb-[2.688rem]"
            // onSubmit={(e) => onSubmit(e)}
          >
            <Label
              htmlFor="email"
              className="text-[1.125rem] font-normal leading-[1.313rem] mb-[0.375rem]"
            >
              Email
            </Label>
            <Input
              type="email"
              placeholder="Email"
              className="rounded-[6px] border-none mb-[1.25rem] bg-secondary placeholder:text-[#A1A0A0] text-[1.125rem] font-normal leading-[1.313rem]"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Label
              htmlFor="Senha"
              className="text-[1.125rem] font-normal leading-[1.313rem] mb-[0.375rem]"
            >
              Senha
            </Label>
            <Input
              type="password"
              placeholder="Senha"
              className="rounded-[6px] border-none mb-[1.75rem] bg-secondary placeholder:text-[#A1A0A0] text-[1.125rem] font-normal leading-[1.313rem]"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/reset-password" className="underline mb-[2.5rem]">
              Esqueci minha senha
            </Link>
            <Button
              type="button"
              className="text-[1.125rem] font-normal leading-[1.313rem]"
              size={"lg"}
              variant={"default"}
              disabled={loading}
              onClick={onSubmit}
            >
              {loading ? (
                <Loader2 className=" h-4 w-4 animate-spin" />
              ) : (
                "Entrar"
              )}
            </Button>
          </form>
          <div className="flex items-center justify-end w-full gap-[0.75rem]">
            <p>Ainda não possui?</p>
            <Button
              type="button"
              size={"lg"}
              variant={"outline"}
              onClick={NavToCreateAccount}
            >
              Criar conta
            </Button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
export default Login;
