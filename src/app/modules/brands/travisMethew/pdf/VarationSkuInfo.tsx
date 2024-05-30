import React from 'react'
import { Space, Table, Tag } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Variation_sku_data } from '../../../model/pdf/PdfModel';

type Props={
    variation_sku_data:Variation_sku_data[]
}
const VarationSkuInfo = ({variation_sku_data}:Props) => {

    const columns: TableColumnsType<Variation_sku_data> = [
    
        {
          title: "SKU",
          dataIndex: "sku",
          key: "sku",
          width: 100,
          
        },
        {
          title: "Size",
          dataIndex: "size",
          key: "size",
          width: 100,
          
        },
        {
          title: "Quantity",
          dataIndex: "qty",
          key: "qty",
          width: 100,
          
        },
        {
          title: "MRP",
          dataIndex: "mrp",
          key: "mrp",
          width: 100,
          
        },
    
    
      ];
  return (
    <div>
        <Table
        
        columns={columns}
        dataSource={variation_sku_data?.map((item) => ({ ...item, key: item?.sku }))}
        pagination={false}
      />
    </div>
  )
}

export default VarationSkuInfo