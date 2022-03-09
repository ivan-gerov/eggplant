export default function InputLabelField (props) {
  return (
    <>
      <label>{props.label}</label>
      <input
        type={props.type}
        min={props.min || ''}
        onChange={props.onChange}
        name={props.name}
        value={props.value}
        required={props.required}
      />
    </>
  )
}
