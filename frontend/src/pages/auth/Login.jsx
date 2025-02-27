import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/CustomInput";
import CustomBtn from "../../components/CustomBtn";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const success = await login(email, password);
  
  if (success) {
    navigate("/"); //take the user to home.
  } else {
    alert("Login failed! Check your credentials.");
  }
};


  return (
    <div className="p-16">
    <form onSubmit={handleSubmit} >
      
      <h1 className=" flex justify-center font-bold text-3xl my-auto">Sign in</h1>
  
      <CustomInput label={"Email"} value={email} placeholder={"E.g. foo@email.com"} type={"email"}   onChange={(e) => setEmail(e.target.value)}/>
      
      <CustomInput label={"Password"} value={password} placeholder={"Enter your password"} onChange={(e) => setPassword(e.target.value)} type={"password"} />
     
      <button type="submit" className="p-2 bg-blue-400 text-white font-bold m-4 mx-auto rounded flex min-w-full justify-center">
        Login</button>
      
    </form>
    </div>
  );
}
