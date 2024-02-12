import AnimatedPage from "@/components/animate-page";
import { ChevronLeft } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function navBack() {
    navigate(-1);
  }
  function onSubmit() {
    setLoading(true);
    setTimeout(() => {
      toast.success("Email enviado", {
        description:
          "Acesse seu e-mail para encontrar sua nova senha temporaria.",

        action: {
          label: "Fechar",
          onClick: () => console.log("Undo"),
        },
      });
      setLoading(false);
    }, 3000);
  }
  return (
    <AnimatedPage>
      <div className="px-[2.25rem] py-[3rem] h-[100vh] flex flex-col justify-between">
        <div>
          <div className="flex justify-start w-full mb-[2.25rem] ">
            <Button variant={"ghost"} size={"icon"} onClick={navBack}>
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex">
            <h1 className="font-bold text-[1.875rem] leading-[2.25rem] mb-[3.438rem]">
              Recuperar senha
            </h1>
          </div>
          <div className="flex flex-col items-start mb-[2.688rem]">
            <Label
              htmlFor="email"
              className="text-[1.125rem] font-normal leading-[1.313rem] mb-[0.375rem]"
            >
              Email
            </Label>
            <Input
              type="email"
              placeholder="Email"
              className="rounded-[6px] border-none mb-[6.25rem] bg-secondary placeholder:text-[#A1A0A0] text-[1.125rem] font-normal leading-[1.313rem]"
            />

            <div className="flex justify-end w-full">
              <Button
                type="submit"
                className="text-[1.125rem] font-normal leading-[1.313rem]"
                size={"lg"}
                variant={"default"}
                onClick={onSubmit}
              >
                {loading ? (
                  <Loader2 className=" h-4 w-4 animate-spin" />
                ) : (
                  "Próximo"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
export default ResetPassword;
