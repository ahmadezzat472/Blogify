import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import loginImage from "@/assets/images/login.png";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <section className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <LoginForm />
          <figure className="relative hidden md:block">
            <img
              src={loginImage}
              alt="Image"
              className="h-full w-full object-cover"
            />
          </figure>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </section>
  );
};

export default LoginPage;
