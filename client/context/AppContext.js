import React, { useState, useEffect, useReducer, createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
//import { UserContext } from '../context/UserContext';
import kurser from '../gyKurserData/exporter';
let { ek, na, sa, te, an } = kurser;

export const AppContext = createContext();

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_IN_SCHOOL':
      return {
        ...state,
        inSchool: action.payload.inSchool,
      }
    case 'CHANGE_GY_LINJE':
      console.log(action.payload)
      return {
        ...state,
        linjeGymnasiet: action.payload.linjeGymnasiet,
        courses: action.payload.courses
      }
    case 'CHANGE_HELP_WITH_MERIT':
      return {
        ...state,
        helpWithMerit: action.payload.helpWithMerit
      }
    case 'CHANGE_GRADES':
      return {
        ...state,
        courses: action.payload.courses,
      }
    case 'CHANGE_BI':
      return {
        ...state,
        bi: action.payload.bi,
      }
    case 'CHANGE_HP':
      return {
        ...state,
        hp: action.payload.hp,
      }
    case 'CHANGE_EXTRA_MERIT':
      return {
        ...state,
        extraMerit: action.payload.extraMerit,
      }
    case 'ADD_COURSE':
      return {
        ...state,
        courses: [...state.courses, action.payload.newCourse],
      }
    case 'CHANGE_INTERESTED_IN':
      return {
        ...state,
        interestedInSubjects: action.payload.interestedInSubjects,
        interestedInCities: action.payload.interestedInCities,
        interestedInSchools: action.payload.interestedInSchools
      }
    default:
      return state;

  }

};

const initialUser = {
  inSchool: true,
  linjeGymnasiet: '',
  helpWithMerit: true,
  courses: an,
  interestedInSubjects: [],
  interestedInCities: [],
  interestedInSchools: [],
  bi: 0,
  bii: 0,
  hp: 0,
  extraMerit: 0

}

export const AppProvider = ({ children }) => {
  const [mainInput, setMainInput] = useLocalStorage('', 'mainInput');
  const [user, dispatch] = useReducer(userReducer, initialUser);

  return (
    <AppContext.Provider value={{ mainInput, setMainInput, user, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};