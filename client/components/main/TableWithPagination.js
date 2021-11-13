import styled from 'styled-components';
import { useTable, usePagination, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { useEffect, useRef, useMemo } from 'react';

const Container = styled.div`
  //width: 100%;
  //overflow: auto;
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  
  table {
    background-color: none;
    border-spacing: 0;
    text-align: left;

    td {
      margin: 0;
      padding: 1rem;
      font-size: ${props => props.theme.fs.pl};
    }

    td.even {
      background-color: white;
    }

    td.odd {
      background-color: ${props => props.theme.grey100};
    }

    th.main-header {
      background: none;
      padding: 1rem;
      padding-left: .1rem;
      padding-top: .5rem;
      font-size: ${props => props.theme.fs.h2m};
    }

    th.sub-header {
      background-color: ${props => props.theme.grey100};
      font-size: ${props => props.theme.fs.pl};
      padding: .5rem 1rem;
    }

  }
`;

const FilterField = styled.div`
  top: 0;
  position: absolute;
  color: green;

  select {
    background-color: ${props => props.theme.grey100};
    padding: 8px;
    border: none;
    border-radius: 2px;
    //width: 20rem;
    //margin: 0 3rem;
  }
`;


const showColumnsOnMount = (width1, width2) => {
  console.log(width1, width2);
  let width = Math.min(width1, width2);
  let res = []
  if (width > 1300) {
    res = ['school_short'];
  }
  if (width < 1300) {
    res = ['anm_kod', 'school_short', 'city', 'antal_sokande_1a_hand'];
  }
  if (width < 1000) {
    res = ['anm_kod', 'school', 'city', 'antal_sokande', 'antal_sokande_1a_hand'];
  }
  if (width < 700) {
    res = ['anm_kod', 'school', 'city', 'antal_sokande', 'antal_sokande_1a_hand', 'bii_urval1'];
  }

  if (width < 475) {
    res = ['anm_kod', 'school', 'city', 'antal_sokande', 'antal_sokande_1a_hand', 'bii_urval1', 'hp_urval1'];
  }
  return res;
}

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

export default function TableWithPagination({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      Filter: SelectColumnFilter
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setHiddenColumns,

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state, //:{ pageIndex, pageSize},
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        hiddenColumns: [],
        sortBy: [
          {
            id: 'bi_urval1',
            desc: true
          }
        ]
      },
      defaultColumn
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  const handleResize = () => {
    if (window.innerWidth > 1300) {
      setHiddenColumns(['school_short']);
    }
    if (window.innerWidth < 1300) {
      setHiddenColumns(['anm_kod', 'school_short', 'city', 'antal_sokande_1a_hand']);
    }
    if (window.innerWidth < 1000) {
      setHiddenColumns(['anm_kod', 'school', 'city', 'antal_sokande', 'antal_sokande_1a_hand']);
    }
    if (window.innerWidth < 700) {
      setHiddenColumns(['anm_kod', 'school', 'city', 'antal_sokande', 'antal_sokande_1a_hand', 'bii_urval1']);
    }
  }

  useEffect(() => {
    console.log(window.innerWidth);
    let res = showColumnsOnMount(window.innerWidth, document.documentElement.clientWidth);
    setHiddenColumns(res);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <Container>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
      {/* <SelectColumnFilter/> */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => {
            let className = 'sub-header';
            if (i === 0) {
              className = 'main-header';
            }
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th width={column.width} {...column.getHeaderProps(column.getSortByToggleProps())} className={className}>
                    {column.render('Header')}
                    {/* <FilterField>{column.canFilter ? column.render('Filter') : null}</FilterField> */}
                    {/* <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span> */}
                  </th>
                ))}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            let className = 'even';
            if (i % 2 !== 0) {
              className = 'odd';
            }
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className={className}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <br></br>
      <br></br>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Container>
  )
}
