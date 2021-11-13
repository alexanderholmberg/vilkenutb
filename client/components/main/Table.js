import styled from 'styled-components';
import { forwardRef, useEffect, useRef } from 'react';
import { useTable, usePagination } from "react-table";

const Container = styled.div`
  //padding: 1rem;
  //margin: 2rem;

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

export default function Table({ columns, data }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
  } = useTable({ columns, data })

  allColumns.forEach(column => {
    if (column.id === 'city') {
      //column.getToggleHiddenProps().checked = false;
      console.log(column.toggleHidden);
    }
    console.log(column);
  })

  return (
    <Container>
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
                  <th {...column.getHeaderProps()} className={className}>{column.render("Header")}</th>
                ))}
              </tr>
            )
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            let className = 'even';
            if (i % 2 !== 0) {
              className = 'odd';
            }
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className={className}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

    </Container>
  );
}