import React from 'react';

export default function CategoriesCostTable({data = []}) {
  function formatToPeso(amount) {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
    }).format(amount);
  }
  return (
    <div className="mt-5 overflow-x-auto rounded-sm border border-stroke bg-white pt-5 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <table className="table table-zebra mb-4">
        <thead>
          <tr>
            <th className="bg-blue-950 text-white uppercase font-xl tracking-wide rounded-l-lg">
              Category Name
            </th>
            <th className="bg-blue-950 text-white uppercase font-xl tracking-wide rounded-r-lg">
              Total Costs
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data.length > 0 ? (<>
              {
                data.map((item) => (
                  <tr>
                    <td className='font-bold text-md'>{item.category_name}</td>
                    <td className='font-bold text-md'>{formatToPeso(item.total_price)}</td>
                  </tr>
                ))
              }
            </>) : (
              <tr>
                <td colSpan={2} className="text-center">
                  No Record
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}
