import axios from "axios";
import Image from "next/image";
import { useCallback, useState } from "react";
import logo from "../public/images/logo.png";
import Input from "./components/Input";

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

const register = useCallback(async () => {
  try {
    await axios.post ('/api/register',{
      email,
      name: name,
      password
    });  
  } catch (error) {
    console.log(error);
  }
  
}, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={logo} alt="Logo" className="w-40" />
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === 'login' ? 'Login' : 'Register'}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === 'register' && (
                  <Input
                    id="username"
                    onChange={(ev: any) => setName(ev.target.value)}
                    value={name}
                    label="Username"
                  />
                )}
                <Input
                  id="email"
                  onChange={(ev: any) => setEmail(ev.target.value)}
                  value={email}
                  label="Email"
                  type="email"
                />
                <Input
                  id="password"
                  onChange={(ev: any) => setPassword(ev.target.value)}
                  value={password}
                  label="Password"
                  type="password"
                />
              </div>
              <button className="
              bg-red-600 
              py-3
              text-white
              rounded-md
              w-full
              mt-10
              hover:bg-red-700
              transition
              text-lg
              font-semibold
              "
              >
                {variant === 'login' ? 'Login' : 'Sign up'}
              </button>
              <p className="text-neutral-500 mt-12 w-full">
              {variant === 'login' ? 'First time on Netflix?' : 'Already'}                
                <span onClick={toggleVariant} className="text-white ml-3 hover:underline cursor-pointer">
                {variant === 'login' ? 'Subscribe now' : 'Login'}                
                </span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Auth;
