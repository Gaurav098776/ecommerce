import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/store/auth-slice/index.js"; // Adjust path as needed

export function LoginForm() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user,loading,error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting user data:", userData);
     await dispatch(loginUser(userData)); // Dispatch login action
    
  };

  console.log(user);
  

  useEffect(() => {
   if(user?.role_name){
    if(user && user?.role_name == "admin"){
      console.log(user);
      
      navigate("/dashboard")
    }
    else{
    navigate("/userEmployee")
    }
   }
  }, [user,navigate])
  

  // useEffect(() => {
  //   console.log("User is authenticated:", isAuthenticated);
  //   if (isAuthenticated) {
  //     console.log(`${role_name} is authenticated, navigating to dashboard`);
  //     navigate("/dashboard");  // Redirect after successful login
  //   }
  // }, [isAuthenticated, role_name, navigate]);

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to log in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </div>
        </CardContent>
        {loading && <p>Loading...</p>} {/* Optional loading indicator */}
        {error && <p className="text-red-600">{error}</p>} {/* Optional error message */}
      </Card>
    </div>
  );
}
