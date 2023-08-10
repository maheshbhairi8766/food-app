import React,{useEffect, useState} from "react";

function MyOrders() {
    const [orderdata, setorderdata] = useState("")

    const fetchMyOrder=async()=>{
        await fetch("http://localhost:5000/api/myordersdata",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:localStorage.getItem("useremail")})
        }).then(async (res)=>{
            let response = await res.json()
            await setorderdata(response)
        })
    }
    useEffect(()=>{
        fetchMyOrder()
    },[])
    return (
        <div className="container" style={{background:"white"}}>
            <div className="row">
                {
                    orderdata !== {} ? Array(orderdata).map(data => {
                        return (
                            data.orderdata ?
                                data.orderdata.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((ArrayData) => {
                                            return (
                                                <div>
                                                    {ArrayData.order_date ? <div>
                                                        {data = ArrayData.order_date}
                                                        <hr />
                                                    </div> :
                                                        <div className="col-lg-3">

                                                            <div className="card mt-3">
                                                                <div className="card-body">
                                                                    <h5>{ArrayData.name}</h5>
                                                                    <div>
                                                                        <span>{ArrayData.qty}</span>
                                                                        <span>{ArrayData.size}</span>
                                                                        <span>{data}</span>
                                                                        <div> ₹{ArrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                }):""
                        )
                    }):""

                }
            </div>
        </div>
    )
}
export default MyOrders;