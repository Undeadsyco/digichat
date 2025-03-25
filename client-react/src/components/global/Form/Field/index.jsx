import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * 
 * @component FormField
 * @param {Object} props
 * @param {String} props.name
 * @param {String} props.label
 * @param {String} props.type
 * @param {String} [props.icon=undefined]
 * @returns {React.Component}
 * 
 * @version 2.0.0
 * @since 2.0.0
 */
const FormField = ({ name, label, type, icon = undefined }) => (
  <div className="form-field relative text-lg sm:text-xl">
    {icon && <FontAwesomeIcon icon={icon} className="absolute z-10 top-1/4 left-2 text-2xl text-black opacity-70"/>}
    <Field
      className="w-full rounded-full py-2 bg-slate-200 placeholder:text-black placeholder:opacity-70 px-9"
      id={name}
      name={name}
      type={type}
      placeholder={label}
    />
  </div>
);

export default FormField;