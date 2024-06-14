import React from 'react'
import { useState, } from 'react';
import { Input, Select, Table, Button } from 'antd';

const CartTable = () => {
    const [columns, setColumn] = useState([
        {
            title: "SKU",
            dataIndex: "SKU",
            width: 100,
            fixed: "left", // Change 'left' to a valid FixedType value
        },

        {
            title: "Name",
            dataIndex: "Name",
            key: "name",
            width: 160,
        },

        // category
        {
            title: "Category",
            dataIndex: "Category",
            width: "90px",
        },
        //product Type
        {
            title: "Type",
            dataIndex: "Type",

            width: "80px",
        },
        {
            title: "Orientation",
            dataIndex: "Orientation",
            width: "100px",
        },
        {
            title: "Life Cycle",
            dataIndex: "LifeCycle",
            width: "80px",
        },
        // product  Model
        {
            title: "Product Model",
            dataIndex: "ProductModel",
            width: "120px",
        },
        // Unit Price
        {
            title: "Unit Price",
            dataIndex: "MRP",
            width: "80px",
        },

        // order Qty
        {
            title: "Qty",
            dataIndex: "OrderQty",
            editable: true,

            width: "70px",

            fixed: "right",
            render: () => (
              
                (
                    <>
                        <Input
                            type="number"

                            placeholder="Enter Qty"

                        />
                    </>
                )
            ),
        },
        {
            title: "Amount",
            dataIndex: "Amount",
            width: "70px",

        },
    ]);
    const productData = [
        {
            SKU: "4D382215Q1006",
            Name: "Ir Lh Apex Dcb 21 Aw Gr Lgt",
            Category: "EQUIPMENT",
            Type: "IRONS",
            Orientation: "	Left Handed",
            LifeCycle: "	In Line",
            ProductModel: "CG IR APEX DCB",
            MRP: "₹1002",
            OrderQty: "12",
            Amount: "₹5002",
        },
        {
            SKU: "4D282215R2006",
            Name: "Ir Rh Bb 23 5P Gr Lgt",
            Category: "EQUIPMENT",
            Type: "IRONS",
            Orientation: "	Left Handed",
            LifeCycle: "	In Line",
            ProductModel: "CG BB 23",
            MRP: "₹1002",
            OrderQty: "10",
            Amount: "₹1295",
        },
        {
            SKU: "4H295034Q3006",
            Name: "Ir Rh Bb 23 5P St Stf",
            Category: "EQUIPMENT",
            Type: "IRONS",
            Orientation: "Right Handed",
            LifeCycle: "	In Line",
            ProductModel: "CG IR APEX DCB",
            MRP: "₹1002",
            OrderQty: "12",
            Amount: "₹1256",
        },
    ];


    return (
        <div className='cw-container'>

<div className='row'>
            <div className='col-6 d-flex'>
                <h4 className='mx-3 pt-3' style={{width:"36%"}}>
                    <a>Select Retailer </a>
                </h4>


                <Select
                    showSearch
                    placeholder="Select retailer"
                    optionFilterProp="children"
                    style={{ width: "30%", marginBottom: 10 }}
                    options={[
                        {
                            value:
                                "IGS Online Shop 31 (1st Floor) Meedo Arcade 28 Rajpur Road Dehradun 248001",
                            label: "Meedo Arcade-DEHRADUN",
                        },
                        {
                            value:
                                "A-31 Basement Lajpat Nagar II New Delhi, Delhi 110024. India ",
                            label: "Delhi Golf House",
                        },
                        {
                            value:
                                "Delhi Golf ClubDr. Zakir Hussain Road, New Delhi, Delhi - 110003 ",
                            label: "Anil Kashyap Pro Shop",
                        },
                    ]}
                />
            </div>


            
            <div className='col-6'>
                <span style={{ marginRight: 10 }}>
                    {" "}
                    <a style={{ color: "#000", }}>Address City :</a>
                </span>
                <span style={{ width: 100, marginRight: 20, borderRight: "1px solid #ddd", paddingRight: "10px", }}>sasa</span>
                <span>
                    <a style={{ color: "#000", }}>GSTIN NO. :</a> 22AAAAA0000A1Z5
                </span>
            </div>



            <div className='col-12 mb-3'style={{textAlign:"end"}}>
                <span className='mx-3'  >
                    <Button > <i style={{ paddingRight: "6px", verticalAlign: "middle", }} className="icon icon-orders"></i>Submit Order</Button>
                  
                </span>
                <span  className='mx-3' >
                    <Button > <i style={{ paddingRight: "6px", verticalAlign: "middle", }} className="icon icon-copy"></i>Submit for Review</Button>
                </span>


                <span className='mx-3' >
                    <Button >
                        <svg style={{ marginRight: 6, verticalAlign: "middle", marginTop: "-2px" }} viewBox="64 64 896 896" focusable="false" data-icon="shopping" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z"></path></svg>
                        Approve Order
                    </Button>
                </span>

                <span className='mx-3' >
                    <Button >

                        <svg style={{ marginRight: 7, verticalAlign: "middle", marginTop: "-3px" }} fill-rule="evenodd" viewBox="64 64 896 896" focusable="false" data-icon="close-square" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 112c17.7 0 32 14.3 32 32v736c0 17.7-14.3 32-32 32H144c-17.7 0-32-14.3-32-32V144c0-17.7 14.3-32 32-32zm-40 72H184v656h656V184zM640.01 338.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z"></path></svg>
                        Reject Order 

                    </Button>
                </span>

                <span className='mx-3' >
                    <Button > <i style={{ paddingRight: "6px", verticalAlign: "middle", }} className="icon icon-feedback" ></i>Add Note</Button>
                </span>
            </div>

            </div>




            {/* <Table
                className="Order"
                columns={columns}
                dataSource={productData}
                bordered
                size="middle"

                scroll={{ x: "100%", y: "auto" }}


                footer={() => (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginLeft: 8,

                        }}
                    >
                        <div style={{ width: "78%" }}>
                            <a style={{ marginRight: 10, color: "#000", }}>Discount</a>
                            <Select
                                showSearch
                                placeholder="Select discount"
                                optionFilterProp="children"


                                options={[
                                    {
                                        value: "₹100",
                                        label: "10%",
                                    },
                                    {
                                        value: "₹200",
                                        label: "20%",
                                    },
                                    {
                                        value: "₹300",
                                        label: "30%",
                                    },
                                ]}
                            />



                        </div>

                        <div style={{ width: "261px" }}>

                            <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                                {" "}
                                <a style={{ color: "#000", paddingRight: "88px", paddingLeft: "10px", }}>Sub Total:</a> ₹1,300
                            </h4>

                            <h4 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px", fontSize: "14px" }}>
                                {" "}
                                <a style={{ color: "#000", paddingRight: "94px", paddingLeft: "10px", }}>Discount:</a>
                            </h4>






                            <h4 style={{ padding: "8px 0px", backgroundColor: "#ddd", fontSize: "14px" }}>
                                <a style={{ color: "#000", paddingRight: "112px", paddingLeft: "10px", }}>Total : </a>₹2,356
                            </h4>
                        </div>

                    </div>
                )} */}
            {/* /> */}



        </div>
    )
}

export default CartTable
