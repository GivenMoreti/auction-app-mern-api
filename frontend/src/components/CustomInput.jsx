export default function CustomInput({ label,type,placeholder,value,onChange,name }) {
  return (
    <div>
          <input required  placeholder={placeholder} 
              value={value}
        onChange={onChange}
        name={name}
        type={type}
          />
    </div>
  );
}
