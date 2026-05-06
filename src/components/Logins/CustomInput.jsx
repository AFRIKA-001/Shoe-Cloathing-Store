const Input = ({ label,id,name,type}) => {
  return (
    <div>
      <label >{label}</label>
      <input name={name} type={type} id={id}  required/>
    </div>
  )
}

export default Input
