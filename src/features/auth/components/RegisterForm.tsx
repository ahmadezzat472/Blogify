import { useState, type SubmitEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { registerUser } from "../services";
import { toast } from "sonner";
import {
  type RegisterValues,
  getErrorMessages,
  validateRegisterValues,
} from "../utils/form";
import InputsError from "@/components/shared/InputsError";

const DEFAULT_VALUES: RegisterValues = {
  name: "",
  email: "",
  password: "",
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState(DEFAULT_VALUES);
  const [errors, setErrors] = useState<Partial<RegisterValues>>({});
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

    const newErrors = validateRegisterValues(values);
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
      const { error } = await registerUser(values);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created successfully!");
      navigate("/auth/login");
    } catch {
      const fallbackMessage = "Unexpected error happened, please try again.";
      toast.error(fallbackMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground">
          Enter your details to get started
        </p>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="name" className="font-semibold text-primary-700">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="John Doe"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <InputsError message={errors.name} />}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-semibold text-primary-700">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="m@example.com"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <InputsError message={errors.email} />}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="font-semibold text-primary-700">
          Password
        </Label>
        <Input
          placeholder="••••••••"
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <InputsError message={errors.password} />}
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
          isLoading={loading}
        >
          Create account
        </Button>

        <p className="text-center text-sm">
          Already have an account?
          <Link to="/auth/login" className="underline underline-offset-4">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
