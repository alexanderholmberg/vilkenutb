import styled from 'styled-components';
import BoltIcon from '../../assets/icons/bolt.svg';
import kurser from '../../gyKurserData/exporter';
import { BetygCard } from '../design/Cards';
let { ek, na, sa, te, an } = kurser;
import { AppContext } from '../../context/AppContext';
import { useContext, useState, useEffect } from 'react';

const Container = styled.div`
  padding: 2rem;

`;

// const StyledBetygCard = styled(BetygCard)`

// `;


const StyledBetygCard = styled.div`

  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(50%, 40rem) 7.5rem 7.5rem min-content;

  position: relative;

  @media (max-width: 450px) {
      grid-template-columns: 45% 7.5rem 7.5rem min-content;
  }

`;

const InnerContainer = styled.div`
  padding-right: .5rem;

`;

const TextInput = styled.input`
  font-size: 1.5rem;
  width: 100%;

  border: 1px solid #ededed;
  border-radius: .2rem;
  padding: 8px 12px;
  outline: none;
`;

const Btn = styled.button`
  outline: none;
  border: ${props => props.active ? "2px solid blue" : "2px solid grey"};
  padding: .5rem;
  margin-top: 1.5rem;
`;

const SelectDiv = styled.div`
  /* padding: 0 4px; */
  border: 1px solid #ededed;
  width: 6rem;
  border-radius: .2rem;

  &.poang-div {
    width: 7.5rem;

    
  }

  &.betyg-div {
    margin-left: 5px;
  }

  select {
    padding: 8.5px 12px;
    outline: none;
    border: none;
  }
`;

const SvgContainer = styled.div`
  margin-left: 7px;
  display: flex;
  align-items: center;

  div {
    display: flex;

    svg {
      /* fill: currentColor; */
    }

    svg:hover {
      fill: #EF476F;
      cursor: pointer;
    }
  }
`;

export default function MeritHelp() {
  const { user, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (user.courses.length > 0) {
      let totalPoints = user.courses.map(course => course.points).reduce((a, b) => a + b);

      let jamforelseTal = (user.courses.map(course => course.points * course.betyg).reduce((a, b) => a + b) / totalPoints);
      console.log(totalPoints, jamforelseTal)
      let bi = parseFloat((jamforelseTal + user.extraMerit).toFixed(2));

      dispatch({
        type: 'CHANGE_BI',
        payload: {
          bi,
        }
      })
    }

  }, [user.courses, user.extraMerit])

  const changeCourse = e => {
    let newCourses = [];

    if (e.currentTarget.id === 'delete') {
      newCourses = user.courses.filter(course => course.id !== e.currentTarget.dataset.kursType);
    } else {
      newCourses = user.courses.map(course => {
        if (course.id === e.currentTarget.dataset.kursType) {
          console.log(course.name)
          let value = e.currentTarget.value;
          if (e.currentTarget.id === 'betyg' || e.currentTarget.id === 'points') {
            value = parseFloat(e.currentTarget.value);
          }
          return {
            ...course,
            [e.currentTarget.id]: value
          }
        }
        return course;
      })
    }

    dispatch({
      type: 'CHANGE_GRADES',
      payload: {
        courses: newCourses
      }
    })
  }

  const addCourse = () => {
    let maxId = 0;
    if (user.courses.length > 0) {
      maxId = Math.max(...user.courses.map(kurs => parseInt(kurs.id)));
    }

    console.log(maxId)

    let newCourse = {
      name: '',
      points: 100,
      id: String(maxId + 1),
      betyg: 15.0,
    }

    dispatch({
      type: 'ADD_COURSE',
      payload: {
        newCourse,
      }
    });
  }

  const changeExtraMerit = (e) => {
    console.log(e.target.value)
    dispatch({
      type: 'CHANGE_EXTRA_MERIT',
      payload: {
        extraMerit: parseFloat(e.target.value)
      }
    })
  }

  return (
    <Container>
      {/* <pre>{JSON.stringify(ek, null, 2)}</pre> */}
      {user.courses.map(course => {
        return (
          <StyledBetygCard
            key={course.id}
          >
            <InnerContainer>
              <TextInput
                type="text"
                id="name"
                data-kurs-type={course.id}
                value={course.name}
                onChange={changeCourse}
              // onKeyDown={removeFocus}
              />
            </InnerContainer>
            <InnerContainer>
              <SelectDiv className="betyg-div">
                <select
                  name="betyg"
                  id="betyg"
                  onChange={changeCourse}
                  data-kurs-type={course.id}
                  value={course.betyg}
                >
                  <option value="20">A</option>
                  <option value="17.5">B</option>
                  <option value="15">C</option>
                  <option value="12.5">D</option>
                  <option value="10">E</option>
                  <option value="0">F</option>
                </select>
              </SelectDiv>
            </InnerContainer>
            <InnerContainer>
              <SelectDiv className="poang-div" >
                <select
                  name="poang"
                  id="points"
                  onChange={changeCourse}
                  data-kurs-type={course.id}
                  value={course.points}
                >
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="150">150</option>
                </select>
              </SelectDiv>
            </InnerContainer>
            <SvgContainer>
              <div
                onClick={changeCourse}
                id="delete"
                data-kurs-type={course.id}
              >
                <BoltIcon height={25} width={25} />
              </div>
            </SvgContainer>
          </StyledBetygCard>
        )
      })}
      <Btn onClick={addCourse}>
        Lägg till kurs
      </Btn>
      <br></br>
      <select
        onChange={changeExtraMerit}>
        <option value="0">0</option>
        <option value="0.5">0.5</option>
        <option value="1.0">1.0</option>
        <option value="1.5">1.5</option>
        <option value="2.0">2.0</option>
        <option value="2.5">2.5</option>
      </select>
      <h3>Meritvärde: {user.bi}</h3>
    </Container>
  );
}