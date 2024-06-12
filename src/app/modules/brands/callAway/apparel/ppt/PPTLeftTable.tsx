import React from 'react'

const PPTLeftTable = () => {
  return (
    <div>
         <table className="table table-row-dashed table-row-gray-300 gy-5 table-product-list fs-4"   style={{border:"1px dashed #ddd", borderRadius:"9px 9px 0 0"}} >
      <thead>
          <tr className="fw-bolder fs-6 text-gray-800">
              <th className='px-5 fs-4 bg-secondary'>SKU</th>
              <th className='fs-4 bg-secondary'>Size</th>
              <th className='fs-4 bg-secondary'>Qty</th>
             
          </tr>
      </thead>
      <tbody>
          <tr>
              <td className='px-5 w-50'>1MZ256_4SBU_2XL	</td>
              <td>2XL</td>
              <td>0</td>
             
          </tr>
          <tr>
              <td className='px-5 w-50'>1MZ256_4SBU_L</td>
              <td>L</td>
              <td>9</td>
             
          </tr>
          <tr>
              <td className='px-5 w-50'>1MZ256_4SBU_M</td>
              <td>M</td>
              <td>3</td>
             
          </tr>
          <tr>
              <td className='px-5 w-50'>1MZ256_4SBU_S</td>
              <td>S</td>
              <td>0</td>
             
          </tr>
          <tr>
              <td className='px-5 w-50'>1MZ256_4SBU_XL</td>
              <td>XL</td>
              <td>4</td>
             
          </tr>
      </tbody>
  </table>
      
    </div>
  )
}

export default PPTLeftTable
