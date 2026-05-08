const Input = ({ label,id,name,type,onChange,placeholder }) => {
  return (
    <div>
      <label >{label}</label>
      <input name={name} type={type} id={id}  onChange={onChange} placeholder={placeholder} required className="border rounded w-full pl-1 bg-white tracking-wide outline-1  py-1 " />
    </div>
  )
}

export default Input
