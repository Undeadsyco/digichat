import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

/**
 * 
 * @param {IconBtnProps} props 
 * @returns {React.Component}
 * 
 * @version 2.0.0
 * @since 2.0.0
 * 
 * this component renders a button with an icon and an optional label
 * 
 * @example
 * const IconBtn = (props) => (
 *   <button>
 *    /icon/
 *    /label/
 *  </button>
 * )
 */
const IconBtn = ({ icon, label, className, classNames, onClick, size = '3xl', color = "white", labelPos }) => {
  const setpos = () => {
    switch (labelPos) {
      case "left":
        return "flex-row-reverse";
      case "right":
        return "flex-row";
      case "top":
        return "flex-col-reverse";
      case "bottom":
        return "flex-col";
      default:
        return "flex-row";
    }
  }
  return (
    <button className={`flex flex-nowrap ${setpos()} items-center text-${color} text-${size} mx-2 ${classNames?.button ?? className ?? ''}`} onClick={onClick}>
      <span className={classNames?.icon_container ?? 'mr-auto'}>
        <FontAwesomeIcon className={`${classNames?.icon ?? ''}`} icon={icon} />
      </span>
      {label && <span className={`${classNames?.label ?? ""}`}>{label}</span>}
    </button>
  );
}

/**
 * @typedef {Object} Styles
 * @property {String} button
 * @property {String} icon_container
 * @property {String} icon
 * @property {String} label
 */

/**
 * @typedef {Object} IconBtnProps
 * @property {String} icon
 * @property {String} [label]
 * @property {Number} [size]
 * @property {String} [color]
 * @property {String } [className]
 * @property {Styles} [classNames]
 * @property {Function} [onClick]
 */
IconBtn.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.element]),
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf({
    button: PropTypes.string,
    icon_container: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
  })]),
  onClick: PropTypes.func,
};

export default IconBtn;
