import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[message,setMessage] = useState("")
  const navigate = useNavigate()


 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const success = await login(email, password);
  
  if (success) {
    navigate("/"); //take the user to home.
  } else {
    setMessage("Invalid credentials")
  }
};


  return (
    <div className="p-20 bg-gray-100">
    
    <form onSubmit={handleSubmit} >
      
      <h1 className=" flex justify-center font-bold text-3xl my-auto text-gray-600">Sign in</h1>
  
      <CustomInput label={"Email"} value={email} placeholder={"E.g. foo@email.com"} type={"email"}   onChange={(e) => setEmail(e.target.value)}/>
      
      <CustomInput label={"Password"} value={password} placeholder={"Enter your password"} onChange={(e) => setPassword(e.target.value)} type={"password"} />
     
      <button type="submit" className="p-2 bg-blue-600 text-white font-extrabold m-4 mx-auto rounded flex min-w-full justify-center">
          Sign in
        </button>
        <div className="flex justify-center m-2">
          <p className="mx-2 font-bold text-gray-600">
            New?
          </p>
            <Link to={"/register"} className="text-gray-500 font-bold text-md">
              Sign Up
            </Link>
            <h1 className="font-bold text-blue-500 text-md text-center">{message}</h1>
    
        </div>  
    </form>
    </div>
  );
}
