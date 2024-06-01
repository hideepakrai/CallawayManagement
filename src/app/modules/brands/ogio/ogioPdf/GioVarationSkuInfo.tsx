import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

import { Variation_sku_data } from '../../../model/pdf/PdfModel';
import "../../travisMethew/pdf/VarationSkuInfo.css"

type Props={
    variation_sku_data:Variation_sku_data[]
}
const GioVarationSkuInfo = ({variation_sku_data}:Props) => {
   

    const columns: TableColumnsType<Variation_sku_data> = [
    
        {
          title: "SKU",
          dataIndex: "sku",
          key: "sku",
          width: 100,
          
        },
        {
          title: "Product Type",
          dataIndex: "product_type",
          key: "product_type",
          width: 100,
          
        },
        {
          title: "Qty",
          dataIndex: "qty",
          key: "qty",
          width: 100,
          
        },
        // {
        //   title: "MRP",
        //   dataIndex: "mrp",
        //   key: "mrp",
        //   width: 100,
          
        // },
    
    
      ];
  return (
    <div>

<Table
         className='table-product-list'
        //  className='cart-table-profile'
         style={{border:"1px solid #f1f1f4", borderRadius:"9px 9px 0 0"}}
        columns={columns}
        dataSource={variation_sku_data?.map((item) => ({ ...item, key: item?.sku }))}
        pagination={false}
      />
    </div>
  )
}

export default GioVarationSkuInfo