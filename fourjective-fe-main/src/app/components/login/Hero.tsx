import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";

export default function Hero() {
  return (
    <section className="w-screen h-screen flex flex-col md:flex-row md:items-center md:px-16">
      <LoginHeader />
      <LoginForm />
    </section>
  );
}
