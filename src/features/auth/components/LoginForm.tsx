import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "../services";
import { toast } from "sonner";
import {
  type LoginValues,
  getErrorMessages,
  validateLoginValues,
} from "../utils/form";

const DEFAULT_VALUES: LoginValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState<Partial<LoginValues>>({});
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  }

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const newErrors = validateLoginValues(values);
    const errorValues = getErrorMessages(newErrors);

    if (errorValues.length > 0) {
      setErrors(newErrors);
      errorValues.forEach((value) => {
        toast.warning(value);
      });

      return;
    }

    try {
      setLoading(true);

      const { error } = await loginUser(values);
      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Logged in successfully!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch {
      const fallbackMessage = "Unexpected error happened, please try again.";
      toast.error(fallbackMessage);
    } finally {
      setLoading(false);
    }
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
          type="email"
          autoComplete="email"
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
            type="button"
            className="ml-auto text-sm underline-offset-2 hover:underline"
          >
            Forgot your password?
          </Button>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={loading}
        isLoading={loading}
      >
        Login
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/auth/register" className="underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
