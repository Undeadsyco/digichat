import { Formik, Form, ErrorMessage } from "formik";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faArrowCircleDown, faArrowCircleUp } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTimesCircle, faArrowCircleDown, faArrowCircleUp);

/**
 * CustumForm component
 * @param {Object} props
 * @param {String} props.title
 * @param {String} props.className
 * @param {Array<React.Component>} props.children
 * @param {Object} props.initialValues
 * @param {Object} props.schema
 * @param {Function} props.onSubmit
 * @returns {React.Component}
 * 
 * @version 2.0.0
 * @since 2.0.0
 * @see Feild
 */
const CustumForm = ({ title, className, children, initialValues, schema, onSubmit, submitLabel, resetLabel  }) => {
  const [errorModal, setErrorModal] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, touched, errors }) => {
        const isTouched = Object.keys(touched).length > 0;
        const hasError = Object.keys(errors).length > 0;
        return (
          <Form className={`${className} relative`}>
            <h1 className="form-title text-4xl font-extrabold text-black text-center">
              {title}
            </h1>
            <div className="input-container">
              {children}
            </div>
            <div className="btn-container">
              <button type="submit" disabled={!isTouched || hasError || isSubmitting}>
                {submitLabel ?? 'Submit'}
              </button>
              <button type="reset">
                {resetLabel ?? 'Reset'}
              </button>
            </div>
            <div className="err-container ">
              <ul className={isTouched && hasError ? "absolute text-base w-full rounded-b-2xl" : 'hidden'}>
                <li>
                  <FontAwesomeIcon
                    icon={errorModal ? 'arrow-circle-up' : 'arrow-circle-down'}
                    onClick={() => setErrorModal(!errorModal)}
                  />
                  <span>Errors</span>
                </li>
                {Object.keys(initialValues).map((key) => (
                  <li {...{ key }} className={`${errorModal && touched[key] && errors[key] ? '' : 'hidden'}`}>
                    <FontAwesomeIcon icon="times-circle" />
                    <ErrorMessage  name={key} component="span" />
                  </li>
                ))}
              </ul>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
}

export default CustumForm;
// Path: src/components/Form/index.js
