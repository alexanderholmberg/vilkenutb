import styled from 'styled-components';
import { MainCard } from '../design/Cards';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const Container = styled.div`
  display: flex;
  justify-content: center;

`;

const StyledCard = styled(MainCard)`
  display: flex;
  flex-direction: column;

  p {
    font-size: 1.4rem;
    margin-bottom: 1rem;
  }

  label {
    font-size:  1.4rem;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      margin-left: 1rem;
      padding: .5rem;
    }
  }

  button {
    margin-top: 1rem;
    width: 20rem;
  }
`;




export default function NoMeritHelp({ changeBiOrHp }) {
  const { user, dispatch } = useContext(AppContext);


  return (
    <StyledCard>
      {/* <h2>Custom Styles</h2> */}
      <p>For custom form validation messages, you’ll need to add the novalidate boolean attribute to your. This disables the browser default feedback tooltips, but still provides access to the form validation APIs in JavaScript.</p>
      <p>When attempting to submit, you’ll see the :invalid and :valid styles applied to your form controls.</p>
      <form>
        <div>
          <label htmlFor="bi">Ditt meritvärde (max 22.5)</label>
          <input
            value={user.bi}
            onChange={changeBiOrHp}
            name="bi"
            type="text"
            placeholder="t.ex. 17.85"
          />
        </div>
        <div>
          <label htmlFor="hp">Ditt bästa HP-resultat (max 2.0)</label>
          <input
            value={user.hp}
            onChange={changeBiOrHp}
            className="hp"
            name="hp"
            type="text"
            placeholder="t.ex. 1.35"
          />
        </div>
        <button type="button" value="Nästa">Gå vidare</button>
      </form>
    </StyledCard>
  )
}