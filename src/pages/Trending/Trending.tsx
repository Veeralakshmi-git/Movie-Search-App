import { Key } from 'react';
import { useQuery } from 'react-query'
import axios from 'axios'
import "./Trending.css"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from '@tanstack/react-table'



type Props  = {
  key: Key; 
  id: number; 
  name:string;
  poster_path: string; 
  title: string; 
  first_air_date: string; 
  release_date: string; 
  media_type: string;
  overview:string
}
 


const columnHelper = createColumnHelper<Props>()

const columns = [
  columnHelper.accessor('poster_path', {
    header: () => 'Poster',
    cell: tableProps => (
      <img
        src={"https://image.tmdb.org/t/p/w200/"+tableProps.row.original.poster_path}  
        alt='Poster'
        style={{border:"2px solid yellow",width: "100%",
        height: "auto"}}
      />
    ),
   
  }),
  
  columnHelper.accessor((row) => row.title || row.name, {
    id: "Title",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Title</span>,
  }),

  columnHelper.accessor((row) => row.first_air_date || row.release_date, {
    id: "Release Date",
    cell: info => info.renderValue(),
   
  }),
  columnHelper.accessor('media_type', {
    header: () => 'Media Type',
   
  }),
  columnHelper.accessor('overview', {
    header: 'Overview',
   
  }),
] 


const Trending = () => {
    const {isLoading,error,data}= useQuery('Trending', async () => {
      const {data} =await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=e192acb0aab966bdc48f1e29bde7b569")
      return data.results
  })
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel()
    }) 

    if(isLoading) return "Loading"
    if(error) return "unExpected Error Occur" + error

return (
          <div className="p-2">
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table> 
          <div className="h-2" />
      <div className="flex items-center gap-2" style={{textAlign:"center",fontSize:"20px"

      }}>
        <button
          className="border rounded p-1 big"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1 big"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1 big"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1 big"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1 big">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1 big">
          | Go to page:
          <input
          style={{padding:"5px"}}
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
        style={{padding:"10px"}}
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 15, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
        <div>{table.getRowModel().rows.length} Rows</div>

      </div>
        </div>

   )
}

export default Trending
