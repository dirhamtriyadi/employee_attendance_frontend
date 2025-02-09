import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { register } from "@/features/authSlice";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

interface IFormData {
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, errors } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<IFormData>({
    full_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(register(formData))
      .unwrap()
      .then(() => navigate("/login"))
      .catch(() => {});
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Enter your email below to register</CardDescription>
          {errors && (
            <div className="bg-red-500 text-white p-4 rounded-md my-4">
              {errors.errors.map((item: any) => (
                <p className="error">{item.message}</p>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOnSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="Example"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password Confirmation</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? "Loading..." : "Register"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to={"/login"} className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
