import { Field, Form } from 'formik';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import Image from '../../../global/Image';
import SelectInput from '../../../global/SelectInput';

const PostFrom = ({ handleChange, initialValues, handleSubmit }) => {
  const [modal, setModal] = useState(initialValues.body ? true : false);
  const [disableTitle, setDisableTitle] = useState(false);

  useEffect(() => {
    if (initialValues.title) setDisableTitle(true);
  }, [initialValues]);

  const handleSelectChange = (selectedOption) => handleChange({ target: { name: 'privacy', value: selectedOption.value } });

  const onSubmit = (values, actions) => {
    handleSubmit(values, actions);
    setModal(false);
  }

  return (
    <Form onSubmit={onSubmit} className="w-full relative top-0 m-2 gradient-horizontal rounded-4xl py-2 px-3 flex-center flex-wrap">
      {/* Header */}
      <div className="grid grid-cols-5 w-full h-14 items-center">
        <Image src="/profile_pic.jpg" alt="profile" />
        <SelectInput
          name="privacy"
          options={[
            { value: '0', label: (<FontAwesomeIcon icon="globe" />) },
            { value: '1', label: (<FontAwesomeIcon icon='lock' />) },
          ]}
          defaultOption={initialValues.privacy || "0"}
          handleChange={handleSelectChange}
        />
        <button type="submit" className="text-2xl size-full col-start-5 justify-self-center">
          <FontAwesomeIcon icon="paper-plane" onClick={() => setModal(!modal)} />
        </button>
      </div>

      {/* Body */}
      <div className="w-full flex flex-col items-start h-40">
        <Field
          name="title"
          className="px-2 row-start-2 col-span-full rounded-full h-[25%] w-[85%] mb-4"
          placeholder="Tell Us Whats On Your Mind..."
          disabled={disableTitle}
        />
        <Field
          name="body"
          as="textarea"
          className="px-2 py-3 row-start-3 row-span-2 col-span-full h-[75%] w-full rounded-4xl"
          placeholder="Explain the details..."
          onFocus={() => setModal(true)}
        />
      </div>
    </Form>
  );
}

export default PostFrom;
