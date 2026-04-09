import { FieldDescription } from "@/components/ui/field";
import RegisterForm from "../components/RegisterForm";
import { Card, CardContent } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <section className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <RegisterForm />
          <div className="relative hidden bg-muted md:block">
            <img
              src="/src/assets/images/login.png"
              alt="Image"
              className="d absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </section>
  );
};

export default RegisterPage;
