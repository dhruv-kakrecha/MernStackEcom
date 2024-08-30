import { ReactElement, useState } from 'react'
import TableHOC from '../components/admin/TableHOC'
import { Column } from 'react-table';
import { NavLink } from 'react-router-dom';

  type DataType = {
     _id:string;
    amount:number;
    quantity:number;
    discount:number;
    status:ReactElement;
    action:ReactElement;  
  }

   const column : Column<DataType>[] = [
    {
      Header:"ID",
      accessor:"_id",
    },
    {
      Header:"Quantity",
      accessor:"quantity",
    },
    {
      Header:"Discount",
      accessor:"discount",
    },
    {
      Header:"Amount",
      accessor:"amount",
    },
    {
      Header:"Status",
      accessor:"status",
    },
    {
      Header:"Action",
      accessor:"action",
    }

  ]


const Orders = () => {

       const [rows,setRows]=useState<DataType[]>(
        [
          {
            _id:"759837469346",
            amount:763487,
            quantity:7869347,
            discount:45,
            status:<h1>Process</h1>,
            action:<NavLink to={`/order/${759837469346}`}>View</NavLink>,  
          }
        ]
      );

    const Table = TableHOC<DataType>(column,rows,"dashboard-product-box","Orders",rows.length > 6 )();

  return (
    <div className='container'>
      <h1>my Orders</h1>
        {Table}
    </div>
  )
}

export default Orders
