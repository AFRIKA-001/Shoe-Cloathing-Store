const Input = ({ label,id,name,type,onChange}) => {
  return (
    <div>
      <label >{label}</label>
      <input name={name} type={type} id={id}  onChange={onChange} required className="border rounded w-full " />
    </div>
  )
}

export default Input
