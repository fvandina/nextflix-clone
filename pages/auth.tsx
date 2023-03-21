import Image from "next/image";
import logo from "../public/images/logo.png";
import Input from "./components/Input";

const Auth = () => {
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={logo} alt="Logo" className="w-40" />
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
                    Sign in
                </h2>
                <div className="flex flex-col gap-24">
                    <Input />
                </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Auth;
