/* eslint-disable react/prop-types */
export default function CustomInput({ label,type,placeholder,value,onChange,name,disabled=false }) {
  return (
  
    <div>
      <label >{label}</label>
          <input className="flex flex-col border-2 border-gray-300 w-full p-2 rounded " required  placeholder={placeholder} 
              value={value}
        onChange={onChange}
        name={name}
        type={type}
        disabled={disabled}
      />
      </div>
   
  );
}
