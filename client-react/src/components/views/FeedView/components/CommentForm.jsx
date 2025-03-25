// Dependencies
import PropTypes from "prop-types";
// Dependency Components
import { Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "../../../global";

/**
 * Commpoment that displays and handles a form for submitting comments
 * @returns {React.Component}
 * 
 * @version 1.0.0
 * @since 2.0.0
 * 
 * @example
 * const CommentForm = () => (
 *  <form>
 *    /...user img /
 *   /...input field /
 *   /...submit button /
 * </form>
 */
const CommentForm = () => (
  <Form className="w-full h-fit grid grid-cols-5 mt-4 relative p-2 border-black border-2 rounded-full">
    <Image src="/profile_pic.jpg" alt="profile" />
    <Field name='body' type="text" className="col-span-4 col-start-2 row-start-1 rounded-4xl p-2" placeholder="Add a comment..." />
    <button type="submit" className="col-start-5 row-start-1 text-2xl text-black">
      <FontAwesomeIcon icon="paper-plane" />
    </button>
  </Form>
);

export default CommentForm;
