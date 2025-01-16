"use client";
import  { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader,CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const SignupForm = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });

  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("api/users/signup", user);
      console.log("Signup Success", res);
      toast.success("Signup successful!");
      setTimeout(() => {
        router.push("/login");
      }, 100); // Temporary for debugging hydration
    } catch (err) {
      console.log("Signup error", err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Register to your NextGenStore</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Jhon@example"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Email</Label>
                </div>
                <Input
                  id="email"
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  placeholder="password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" onClick={onSignup}>
              {buttonDisabled ? "No signup" : "Signup"}
              </Button>
             
            </div>
            <div className="mt-4 text-center text-sm">
              Want to visit LoginPage?{" "}
              <Link href="/login" className="underline underline-offset-4">Login page</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;
