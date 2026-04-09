import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "../services";
import { toast } from "sonner";

type DefaultValues = { email: string; password: string };

const DEFAULT_VALUES: DefaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState(DEFAULT_VALUES);
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors = {} as DefaultValues;

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    return newErrors;
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const newErrors = validate();
    const errorValues = Object.values(newErrors);

    if (errorValues.length > 0) {
      setErrors(newErrors);
      errorValues.forEach((value) => {
        toast.warning(value);
      });

      return;
    }

    setLoading(true);
    const { data, error } = await loginUser(values);
    console.log(data);

    setLoading(false);

    if (error) {
      setServerError(error.message);
      toast.error(error.message);
      return;
    }

    toast.success("Logged in successfully!");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-10">
      <div className="flex flex-col items-center gap-1 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">Login to your account</p>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="text"
          placeholder="m@example.com"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <Button
            variant="link"
            className="ml-auto text-sm underline-offset-2 hover:underline"
          >
            Forgot your password?
          </Button>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Server error */}
      {serverError && (
        <p className="text-center text-sm text-red-500">{serverError}</p>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/auth/register" className="underline underline-offset-4">
          Sign up
        </a>
      </p>
    </form>
  );
};

export default LoginForm;
