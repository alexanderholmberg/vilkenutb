import { useMemo, useState, useEffect, useContext } from "react";
import Table from './Table';
import styled from 'styled-components';
import { InputField } from '../design/InputFields';
import { PrimaryButton } from '../design/Buttons';
import ArrowRightIcon from '../../assets/icons/arrow-right.svg';
//import CaretIcon from '../assets/icons/caret.svg';
import { AppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';

const fakeData1 = [
  { program: 'Juristprogrammet', skola: 'Stockholms universitet', antalSokande: 7204 },
  { program: 'Juristprogrammet', skola: 'Uppsala universitet', antalSokande: 6296 },
  { program: 'Läkarprogrammet', skola: 'Karolinska institutet', antalSokande: 6085 },
  { program: 'Juristprogrammet', skola: 'Lunds universitet', antalSokande: 5981 },
  { program: 'Juristprogrammet', skola: 'Göteborgs universitet', antalSokande: 5962 },
  { program: 'Läkarprogrammet', skola: 'Göteborgs universitet', antalSokande: 5745 },
  { program: 'Läkarprogrammet', skola: 'Uppsala universitet', antalSokande: 5684 },
  { program: 'Läkarprogrammet', skola: 'Linköpings universitet', antalSokande: 5276 },
  { program: 'Läkarprogrammet', skola: 'Örebro universitet', antalSokande: 5141 },
  { program: 'Psykologprogrammet', skola: 'Stockholms universitet', antalSokande: 4991 },
]

const Container = styled.div`
  padding: 1.5rem;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  @media (min-width: 1000px) {
    grid-template-columns: 2fr 3fr;
  }
`;

const LargePrimaryButton = styled(PrimaryButton)`
  margin-top: 1.25rem;
  padding: 13px 12px;
  font-size: 1.65rem;
`;

const Search = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 0 2rem;
  width: 100%;
  max-width: 50rem;
  //margin: 0 1rem;

  label {
    text-align: center;
    font-size: ${props => props.theme.fs.h2s};
    padding-bottom: 2rem;
  }

  @media (min-width: 1000px) {
    margin-top: 15rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }
`;

const Stats = styled.div`

  display: flex;
  flex-direction: column;
  padding: 4rem 2rem 2rem 2rem;
`;

const SpanText = styled.span`
  font-size: ${props => props.theme.fs.pm};
`;

const SeeMoreLink = styled.a`
  margin-top: 1rem;

  display: flex;
  align-items: center;
  //justify-content: end;
  width: 16.25rem; // very bad

  padding: 1rem;
  font-size: 1.5rem;
  text-decoration: underline;
  color: ${props => props.theme.primary100};

  cursor: pointer;

  &:hover {
    filter: brightness(1.5);
  }

  &:hover path {
    filter: brightness(1.5);
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledArrowRightIcon = styled(ArrowRightIcon)`
  padding-top: 0.5rem;
  //height: 100%;
  //width: 100%;

  path {
    fill: ${props => props.theme.primary100};
  }
`;

const SearchText = styled.div`
  margin: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  h3 {
    font-size: ${props => props.theme.fs.h3s};
    padding-bottom: .5rem;
  }

  p {
    font-size: ${props => props.theme.fs.pl};
  }
`;

export default function SearchAndStats() {
  const router = useRouter();
  const { mainInput, setMainInput } = useContext(AppContext);
  const [programStats, setProgramStats] = useState(fakeData1);

  const columns = useMemo(
    () => [{
      Header: "Populäraste programmen 2020",
      columns: [
        {
          Header: "Program",
          accessor: "program"
        },
        {
          Header: "Skola",
          accessor: "skola"
        },
        {
          Header: "Antal sökande",
          accessor: "antalSokande"
        }
      ]
    }
    ], []
  );

  const handleChange = e => {
    setMainInput(e.target.value);
  }

  const handleClick = e => {
    e.preventDefault();
    router.push('/search');
  }

  return (
    <Container>
      <Search>
        <label>Sök efter utbildningar</label>
        <form onSubmit={handleClick}>
          <InputField
            placeholder="Vad är du ute efter?"
            value={mainInput}
            onChange={handleChange}
          />
          <LargePrimaryButton type="submit">Sök</LargePrimaryButton>
        </form>
        <SearchText>
          <div>
            <h3 className="heading">För dig som är:</h3>
            <p>- en gymnasieelev</p>
            <p>- en högstadieelev</p>
            <p>- en högskolestudent</p>
            <p>- en förälder</p>
            <p>- intresserad!</p>
          </div>
          <div>
            <h3 className="heading">Vanliga sökningar</h3>
            <p>- handels ekonomi</p>
            <p>- kth programmering</p>
            <p>- uppsala juridik</p>
            <p>- läkare</p>
            <p>- industriell ekonomi</p>
          </div>
        </SearchText>
      </Search>
      <Stats>
        <SpanText>Statistik</SpanText>
        <Table columns={columns} data={programStats} />
        <SeeMoreLink>
          <span>Mer statistik</span>
          <IconContainer>
            <StyledArrowRightIcon height={25} width={25} />
          </IconContainer>
        </SeeMoreLink>
      </Stats>
    </Container>
  )
}