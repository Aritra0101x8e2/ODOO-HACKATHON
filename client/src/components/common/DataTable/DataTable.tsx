import type { ReactNode } from "react";


interface Column<T> {

  key: keyof T;

  title: string;

  render?: (
    value: T[keyof T],
    row: T
  ) => ReactNode;

}



interface DataTableProps<T> {

  columns: Column<T>[];

  data: T[];

  loading?: boolean;

  emptyMessage?: string;

}



export default function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available.",
}: DataTableProps<T>) {


  if (loading) {

    return (

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">

        Loading...

      </div>

    );

  }



  if (data.length === 0) {

    return (

      <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center text-zinc-500">

        {emptyMessage}

      </div>

    );

  }



  return (

    <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">


      <div className="overflow-x-auto">


        <table className="w-full border-collapse">


          <thead className="bg-zinc-950">


            <tr>

              {
                columns.map((column)=>(

                  <th

                    key={String(column.key)}

                    className="border-b border-zinc-800 px-6 py-4 text-left text-sm font-semibold uppercase tracking-wide text-zinc-400"

                  >

                    {column.title}

                  </th>

                ))
              }

            </tr>


          </thead>



          <tbody>


            {
              data.map((row,index)=>(

                <tr

                  key={index}

                  className="transition hover:bg-zinc-800/40"

                >


                  {
                    columns.map((column)=>(

                      <td

                        key={String(column.key)}

                        className="border-b border-zinc-800 px-6 py-4 text-sm text-zinc-200"

                      >


                        {
                          column.render

                          ?

                          column.render(
                            row[column.key],
                            row
                          )

                          :

                          String(
                            row[column.key] ?? "-"
                          )
                        }


                      </td>


                    ))
                  }


                </tr>


              ))
            }


          </tbody>



        </table>


      </div>


    </div>

  );

}