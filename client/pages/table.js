import React, { useMemo, useState } from 'react'
import { useTable, useGlobalFilter, useFilters, useAsyncDebounce } from 'react-table'
import MOCK_DATA from '../dummyData/MOCK_DATA.json'
import { COLUMNS } from '../dummyData/columns'
import styled from 'styled-components';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const GlobalFilter = ({ filter, setFilter }) => {
  //const [value, setValue] = useState(filter);

  // const onChange = useAsyncDebounce(value => {
  //   setFilter(value || undefined);
  // }, 1000)

  return (
    <span>
      Search: {' '}
      <input value={filter || ''} onChange={e => {
        setFilter(e.target.value);
        //onChange(e.target.value)
      }} />
    </span>
  )
}

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      Search: {' '}
      <input value={filterValue || ''} onChange={e => setFilter(e.target.value)} />
    </span>
  )
}

const DefaultColumnFilter = ({ column: { filterValue, preFilteredRows, setFilter } }) => {
  const count = preFilteredRows.length

  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}

const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
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

function BasicTable({ columns, data }) {

  const defaultColumn = React.useMemo(
    () => ({
      Filter: SelectColumnFilter
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,

  } = useTable({
    columns,
    data,
    defaultColumn,
  },
    useFilters,
    useGlobalFilter
  )

  const { globalFilter } = state;

  return (
    <Styles>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Styles>
  )
}

export default function table() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        disableFilters: true,
        sticky: 'left'
      },
      {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        sticky: 'left'
      },
      {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        sticky: 'left',
        Filter: SelectColumnFilter,
      },
      {
        Header: 'Date of Birth',
        Footer: 'Date of Birth',
        accessor: 'date_of_birth',
        Cell: 'hey'
      },
      {
        Header: 'Country',
        Footer: 'Country',
        accessor: 'country'
      },
      {
        Header: 'Phone',
        Footer: 'Phone',
        accessor: 'phone'
      },
      {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Age',
        Footer: 'Age',
        accessor: 'age'
      },
    ],
    []
  )

  return (
    <Styles>
      <BasicTable columns={columns} data={MOCK_DATA} />
    </Styles>
  )
}