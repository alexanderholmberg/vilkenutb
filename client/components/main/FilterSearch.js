import TableWithPagination from './TableWithPagination';
import styled from 'styled-components';
import { LargePrimaryButton } from '../design/Buttons';
import Dropdown from './Dropdown';
import { InputFieldSmall } from '../design/InputFields';
import { skolor, amnesOmraden, platser } from '../../dummyData/dummyData';
import { AppContext } from '../../context/AppContext';
import { useContext, useState } from 'react';

const Container = styled.div`
  //background-color: white;
  padding: 3rem;
  
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  @media (min-width: 1200px) {
    margin: 0 5rem;
  }
`;

const AdvancedSearch = styled.form`
  justify-self: stretch;
  //width: 90%;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap: 1.5rem;

  @media (min-width: 770px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }  

  @media (min-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }

`;

const StyledInputFieldSmall = styled(InputFieldSmall)`
  padding: 13px;
  width: 100%;
`;

const Stats = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 4rem;

`;

const SpanText = styled.span`
  font-size: ${props => props.theme.fs.pm};
`;

const InputContainer = styled.div`
  width: 100%;
  //text-align: left;
  //display: flex;
  //justify-content: start;
`;

export default function FilterSearch({ onSearch, setSelectedSchools,
  setSelectedCities, setSelectedSubjects, columns, programs }) {
  const { mainInput, setMainInput } = useContext(AppContext);

  return (
    <Container>
      <AdvancedSearch onSubmit={onSearch}>
        <InputContainer>
          <StyledInputFieldSmall
            placeholder="nyckelord"
            value={mainInput}
            onChange={(e) => { setMainInput(e.target.value) }}
            autoFocus
          ></StyledInputFieldSmall>
        </InputContainer>
        <Dropdown options={skolor} setSelectedOptions={setSelectedSchools}>
          Välj högskolor...
        </Dropdown>
        <Dropdown options={platser} setSelectedOptions={setSelectedCities}>
          Välj platser...
        </Dropdown>
        <Dropdown options={amnesOmraden} setSelectedOptions={setSelectedSubjects}>
          Välj ämnesområden...
        </Dropdown>
        <LargePrimaryButton type="submit">Filtrera</LargePrimaryButton>
      </AdvancedSearch>
      <Stats>
        <SpanText>Sökresultat: 10</SpanText>
        <TableWithPagination columns={columns} data={programs} />
      </Stats>

    </Container>
  )
}