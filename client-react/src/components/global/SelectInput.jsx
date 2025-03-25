import Select from "react-select";

const SelectInput = ({ name, options, defaultOption, handleChange, }) => {
  const onChange = (selectedOption) => handleChange({ target: { name: name, value: selectedOption.value } })

  return (
    <Select
      name={name}
      styles={{
        container: (styles) => ({ ...styles, width: 'fit-content', height: "fit-content", fontSize: '0.75rem', marginTop: 'auto', marginRight: "auto" }),
        control: (styles) => ({ ...styles, width: '2.75rem', minHeight: "1.5rem", fontSize: '0.75rem', borderRadius: '4rem' }),
        valueContainer: (styles) => ({ ...styles, width: 'fit-content', fontSize: '0.75rem', padding: "0", paddingLeft: "0.25rem"}),
        dropdownIndicator: (styles) => ({ ...styles, width: 'fit-content', fontSize: '0.75rem', padding: "0", paddingRight: "0.25rem" }),
        indicatorSeparator: (styles) => ({ ...styles, width: 'fit-content', fontSize: '0.75rem' }),
        singleValue: (styles) => ({ ...styles, width: 'fit-content', fontSize: '0.75rem' }),
        input: (styles) => ({ display: 'none' }),
        menu: (styles) => ({ ...styles, width: 'fit-content', fontSize: '0.75rem' }),
        option: (styles) => ({ ...styles, width: 'fit-content', fontSize: '0.75rem', padding: "4px 6px" }),

      }}
      defaultValue={options.find(option => option.value === defaultOption)}
      onChange={onChange}
      options={options}
    />
  );
}

export default SelectInput;
