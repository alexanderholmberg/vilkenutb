import styled from 'styled-components';
import Header from '../components/main/Header';
import SearchAndStats from '../components/main/SearchAndStats';

const MainContainer = styled.div`
  /* padding: 1.5rem; */
`;

export default function Home() {


  return (
    <MainContainer>
      <Header />
      <SearchAndStats />
    </MainContainer>
  )
}


