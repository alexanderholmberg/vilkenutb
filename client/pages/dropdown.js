import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import { defaultTheme } from '../utils';

const options = [
  { value: 'blues', label: 'Blues' },
  { value: 'rock', label: 'Rock' },
  { value: 'jazz', label: 'Jazz' },
  { value: 'orchestra', label: 'Orchestra' }
];

const Container = styled.div`
  margin: 4rem;
  width: 400px;
  font-size: ${props => props.theme.fs.pl};

  .react-select {

    &-container {
    }

    &__control {
    }

    &__value-container {
      padding: 20px 12px;
    }

    &__menu {
      color: red;
    }
  }
`;

export default function Dropdown() {

  function display(data) { console.log('data:', data); }
  function printHello() { console.log('Hello'); }

  setTimeout(printHello, 0);

  fetch('https://ghibliapi.herokuapp.com/people').then(display);

  console.log('me first!');

  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(selectedOptions);

  function customTheme(theme) {
    return {
      ...theme,
      padding: '10px',
      colors: {
        ...theme.colors,
      }
    }
  }

  const handleChange = e => {
    console.log(e);
  }

  return (
    <Container>
      <Select
        placeholder="Välj skolor..."
        //defaultValue={[options[1], options[2]]}
        isMulti
        name="colors"
        options={options}
        theme={customTheme}
        //components={makeAnimated()}
        onChange={setSelectedOptions}
        isSearchable
        instanceId="string"
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </Container>
  );
}


