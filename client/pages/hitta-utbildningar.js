import Header from '../components/main/Header';
import styled from 'styled-components';
import { MainCard } from '../components/design/Cards';
import { AppContext } from '../context/AppContext';
import { useContext, useState, useEffect } from 'react';
import MeritHelp from '../components/main/MeritHelp';
import NoMeritHelp from '../components/main/NoMeritHelp';
import kurser from '../gyKurserData/exporter';
let { ek, na, sa, te, an } = kurser;
import Dropdown from '../components/main/Dropdown';
import { skolor, amnesOmraden, platser } from '../dummyData/dummyData';
import { LargePrimaryButton } from '../components/design/Buttons';
import { useRouter } from 'next/router';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 20rem;
`;

const ChoiceMainCard = styled(MainCard)`

  div {
    margin-top: 2rem;
    display: grid;
    justify-content: center;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;

    button {
      padding: 10px 5px;
    }
  }
  
`;

const Btn = styled.button`
  outline: none;
  border: ${props => props.active ? "2px solid blue" : "2px solid grey"};
  padding: .5rem;
`;

const CHANGE_GY_LINJE = 'CHANGE_GY_LINJE';
const CHANGE_IN_SCHOOL = 'CHANGE_IN_SCHOOL';
const CHANGE_BI = 'CHANGE_BI';
const CHANGE_HP = 'CHANGE_HP';
const CHANGE_HELP_WITH_MERIT = 'CHANGE_HELP_WITH_MERIT';

export default function HittaUtbildningar() {
  const router = useRouter();
  const { user, dispatch } = useContext(AppContext);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSchools, setSelectedSchools] = useState([]);
  //const [helpWithMerit, setHelpWithMerit] = useState(true);

  useEffect(() => {
    let subjectsValues = selectedInterests.map(interest => interest.value);
    let citiesValues = selectedCities.map(cities => cities.value);
    let schoolsValues = selectedSchools.map(schools => schools.value);
    dispatch({
      type: 'CHANGE_INTERESTED_IN',
      payload: {
        interestedInSubjects: subjectsValues,
        interestedInCities: citiesValues,
        interestedInSchools: schoolsValues,
      }
    })
  }, [selectedInterests, selectedCities, selectedSchools])

  const changeGyLinje = e => {
    dispatch({
      type: CHANGE_GY_LINJE,
      payload: {
        linjeGymnasiet: e.target.name,
        courses: kurser[e.target.name]
      }
    });
  }

  const changeInSchool = value => {
    dispatch({
      type: CHANGE_IN_SCHOOL,
      payload: {
        inSchool: value,
      }
    });
  }

  const changeHelpWithMerit = value => {
    dispatch({
      type: CHANGE_HELP_WITH_MERIT,
      payload: {
        helpWithMerit: value,
      }
    });
  }

  const changeBiOrHp = e => {
    let type;
    if (e.target.name === 'bi') {
      type = CHANGE_BI
    } else if (e.target.name === 'hp') {
      type = CHANGE_HP
    }
    dispatch({
      type,
      payload: {
        [e.target.name]: e.target.value,
      }
    });
  }

  const changeInterests = () => {

    dispatch({
      type: 'CHANGE_INTERESTED_IN',
      payload: {
        interestedInSubjects: '',
      }
    })
  }

  const toResultPage = () => {
    router.push('/resultat');
  }

  return (
    <>
      <Header />
      <Container>
        {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
        <MainCard>
          <h1>Vi hjälper dig att hitta utbildning</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </MainCard>
        <ChoiceMainCard>
          <h2>Välj det alternativ som passar in på dig:</h2>
          <div>
            <Btn
              onClick={() => changeInSchool(true)}
              active={user.inSchool}
            >
              Jag går på gymnasiet just nu</Btn>
            <Btn
              onClick={() => changeInSchool(false)}
              active={!user.inSchool}
            >Jag är färdig med gymnasiet</Btn>
          </div>
        </ChoiceMainCard>
        <ChoiceMainCard>
          {(user.inSchool) ? <h2>Vilken linje går du på?</h2> : <h2>Vilken linje gick du på gymnasiet?</h2>}
          <div>
            <Btn
              name="ek"
              onClick={changeGyLinje}
              active={user.linjeGymnasiet === 'ek'}
            >Ekonomiprogrammet</Btn>
            <Btn
              name="na"
              onClick={changeGyLinje}
              active={user.linjeGymnasiet === 'na'}
            >Naturvetenskapliga programmet</Btn>
            <Btn
              name="sa"
              onClick={changeGyLinje}
              active={user.linjeGymnasiet === 'sa'}
            >Samhällsvetenskapliga programmet</Btn>
            <Btn
              name="te"
              onClick={changeGyLinje}
              active={user.linjeGymnasiet === 'te'}
            >Teknikprogrammet</Btn>
            <Btn
              name="an"
              onClick={changeGyLinje}
              active={user.linjeGymnasiet === 'an'}
            >Annat</Btn>
          </div>
        </ChoiceMainCard>
        <ChoiceMainCard>
          <h2>Räkna ut ditt meritvärde</h2>
          <div>
            <Btn
              onClick={() => changeHelpWithMerit(false)}
              active={!user.helpWithMerit}
            >Jag vill skriva in meritvärdet själv</Btn>
            <Btn
              onClick={() => changeHelpWithMerit(true)}
              active={user.helpWithMerit}
            >Jag vill få hjälp med att räkna ut mitt meritvärde</Btn>
          </div>
        </ChoiceMainCard>
        <div>
          {(user.helpWithMerit) ?
            (<MeritHelp></MeritHelp>)
            :
            (<NoMeritHelp changeBiOrHp={changeBiOrHp} ></NoMeritHelp>)}
        </div>
        <MainCard>
          <h2>Välj några ämnesområden som intresserar dig:</h2>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
          <Dropdown options={amnesOmraden} setSelectedOptions={setSelectedInterests}>
            Välj ämnen som intresserar dig...
          </Dropdown>
          <h2>Välj några städer som du skulle kunna tänka dig att bo i:</h2>
          <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."</p>
          <Dropdown options={platser} setSelectedOptions={setSelectedCities}>
            Välj några städer...
          </Dropdown>
          <h2>Välj några skolor som du skulle kunna tänka dig att plugga på:</h2>
          <p>"Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
          <Dropdown options={skolor} setSelectedOptions={setSelectedSchools}>
            Välj några skolor...
          </Dropdown>
          <br></br>
          <LargePrimaryButton onClick={toResultPage}>Hitta utbildningar</LargePrimaryButton>

        </MainCard>
      </Container>
    </>
  )
}