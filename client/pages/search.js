import styled from 'styled-components';
import Header from '../components/main/Header';
import FilterSearch from '../components/main/FilterSearch';
import { InputField } from '../components/design/InputFields';
import { AppContext } from '../context/AppContext';
import { useContext, useState, useEffect, useMemo } from 'react';
import { LargePrimaryButton } from '../components/design/Buttons';
import TableWithPagination from '../components/main/TableWithPagination';
import { fakeData1 } from '../dummyData/dummyData';
import api from '../apis/api';


const MainContainer = styled.div`
  //padding: 1.5rem;
`;

const Heading = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  
  h1 {
    text-align: center;
    font-size: ${props => props.theme.fs.h1xl};
  }
`;

const Search = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 1rem 2rem;

  width: 100%;
  max-width: 55rem;

  label {
    text-align: center;
    font-size: ${props => props.theme.fs.h2s};
    padding-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    margin-bottom: 1.25rem;
  }
`;

export default function Home() {
  const { mainInput, setMainInput } = useContext(AppContext);
  const [selectedSchools, setSelectedSchools] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [programs, setPrograms] = useState(fakeData1);

  useEffect(() => {
    // const fetch = async () => {
    //   const res = await api.get(`/programs`, {
    //     params: {
    //       kind: 'search',
    //       mainInput: mainInput,
    //     }
    //   });
    //   setPrograms(res.data.data.programs);
    // }
    // fetch();
  }, []);

  const onSearch = async (e) => {
    e.preventDefault();
    try {
      // let schools = selectedSchools.map(school => school.value);
      // let cities = selectedCities.map(cities => cities.value);
      // let subjects = selectedSubjects.map(subject => subject.value);
      // const res = await api.get(`/programs`, {
      //   params: {
      //     kind: 'search',
      //     mainInput: mainInput,
      //     schools,
      //     cities,
      //     subjects,
      //   }
      // });
      // //console.log(res.data.data.programs);

      // setPrograms(res.data.data.programs)

    } catch (err) { console.log(err); }
  }

  const onFilterSearch = async (e) => {
    e.preventDefault();
    try {
      let schools = selectedSchools.map(school => school.value);
      let cities = selectedCities.map(cities => cities.value);
      let subjects = selectedSubjects.map(subject => subject.value);

      const res = await api.get(`/programs`, {
        params: {
          kind: 'filterSearch',
          schools,
          cities,
          subjects,
        }
      });

      setPrograms(res.data.data.programs)

    } catch (err) { console.log(err); }
  }

  const columns = useMemo(
    () => [{
      Header: " ",
      columns: [
        {
          Header: "Program",
          accessor: "name",
          width: "500px",
        },
        {
          Header: "Skola",
          accessor: "school",
          width: "400px",
        },
        {
          Header: "Skola",
          accessor: "school_short",
        },
        {
          Header: "Kod",
          accessor: "anm_kod",
        },
        {
          Header: "Stad",
          accessor: "city",
        },
        {
          Header: "BI",
          accessor: "bi_urval1",
          sortType: 'basic',
          width: "100px",
        },
        {
          Header: "BII",
          accessor: "bii_urval1",
          sortType: 'basic',
          width: "100px",
        },
        {
          Header: "HP",
          accessor: "hp_urval1",
          sortType: 'basic',
          width: "100px",
        },
        {
          Header: "Antal sökande",
          accessor: "antal_sokande",
          sortType: 'basic',
          width: "200px"
        },
        {
          Header: "1:a handssökande",
          accessor: "antal_sokande_1a_hand",
          sortType: 'basic',
          width: "200px"

        },
      ]
    }
    ], []
  );


  return (
    <MainContainer>
      <Header />
      <Heading>
        {/* <h1>The leading job board for designers, developers, and creative pros.</h1> */}
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</h1>
      </Heading>
      <FilterSearch
        onSearch={onSearch}
        setSelectedSchools={setSelectedSchools}
        setSelectedCities={setSelectedCities}
        setSelectedSubjects={setSelectedSubjects}
        columns={columns}
        programs={programs}

      />
    </MainContainer>
  )
}


