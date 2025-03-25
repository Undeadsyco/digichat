import PropTypes from "prop-types";
import { Field, Form, FormikContext } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SelectInput from "../../../global/SelectInput";
import Image from "../../../global/Image";
import IconBtn from "../../../global/IconBtn";

/**
 * Form to create a new group
 * @param {FormikContext} props
 * @returns {React.Component}
 */
const GroupForm = ({ handleChange, initialValues }) => (
  <Form className="gradient-vertical p-4 rounded-4xl w-3/4 h-1/3 flex flex-col justify-between">
    <div className="flex items-center">
      <Image src="/profile_pic.jpg" alt="logo" />
      <span className="ml-2">
        <h1 className="text-xl font-bold">Create A Group</h1>
        <SelectInput
          name="privacy"
          options={[
            { value: '0', label: (<FontAwesomeIcon icon="globe" />) },
            { value: '1', label: (<FontAwesomeIcon icon='lock' />) },
          ]}
          defaultOption={initialValues.privacy || "0"}
          handleChange={handleChange}
        />
      </span>
      <IconBtn className="ml-auto" size="3xl" icon="plus-circle" color="black" onClick={handleChange} />
    </div>

    <div className="flex flex-col itmes-start h-2/3 justify-between">
      <Field className="h-1/4 w-3/4 rounded-full px-2 mb-2" name="name" type="text" placeholder="Group Name" />
      <Field className="h-3/4 rounded-2xl px-2 py-1" name="description" as="textarea" type="text" placeholder="Group Description" />
    </div>
  </Form>
);

GroupForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
}

export default GroupForm;
