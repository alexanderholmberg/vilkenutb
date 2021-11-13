import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import styled from 'styled-components';



const Container = styled.div`
  width: 100%;
  font-size: ${props => props.theme.fs.pl};

  .react-select {

    &-container {
      
    }
    
    &__control {
      background-color: ${props => props.theme.white};
      border: none;
      border-radius: 2px;

    }

    &__value-container {
      padding: 8px;
    }

    &__menu {
      
    }

    &__multi-value {
      //display: none;
    }
  }
`;

export default function Dropdown({ options, children, setSelectedOptions }) {

  return (
    <Container>
      <Select
        placeholder={children}
        isMulti
        options={options}
        onChange={setSelectedOptions}
        isSearchable
        instanceId="string"
        className="react-select-container"
        classNamePrefix="react-select"
      //controlShouldRenderValue={false}
      />
    </Container>
  );
}


