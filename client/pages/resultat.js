import styled from 'styled-components';
import { AppContext } from '../context/AppContext';
import { useContext, useState, useEffect } from 'react';

export default function resultat() {
  const { user, dispatch } = useContext(AppContext)

  return (
    <pre>{JSON.stringify(user, null, 2)}</pre>
  )
}