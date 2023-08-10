import React, { useEffect, useRef, useState } from "react";
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import { useDipatchCart,useCart } from "./ContextReducer";
import { type } from "@testing-library/user-event/dist/type";
function Cardg(props)
{
    let data=useCart();
    let dispatch = useDipatchCart();
    let options =props.options;
    let priceOptions = Object.keys(options)
    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")
    let finalPrice = qty*parseInt(options[size]);
    const priceRef =useRef();
    const handleonclick=async ()=>{
        await dispatch ({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalPrice,qty:qty,size:size})
        console.log(data)
      }
    useEffect(()=>{
      setsize(priceRef.current.value)
    })
    return(
        <Card style={{width:"20rem", height:"33rem",margin:8,objectFit:"fill",maxHeight:500}}>
        <img src={props.fooditem.img} className="card-image-top" alt="..." style={{objectFit:"fill",maxHeight:200}} />
        <CardBody>
          <CardTitle>{props.fooditem.name}</CardTitle>
          <CardSubtitle>{props.fooditem.Category}</CardSubtitle>
          <CardText>{props.fooditem.description}</CardText>
          <div className="container w-100">
          <select className="m-1 w-50" onChange={(e)=>{
              setqty(e.target.value)
          }}>
          {
            Array.from(Array(6),(e,i)=>{
                return(
                    <option key={i+1} value={i+1}>{i+1}</option>
                )
            })
          }
          </select>
          <select className="m-2 width-50 rounded" ref={priceRef} onChange={(e)=>{
              setsize(e.target.value)
          }}>
                {
                  priceOptions.map((data)=>{
                    return <option key={data} value={data} >{data}</option>
                  })
                }
          </select>
          
          </div>
          <div>
          ₹{finalPrice}/-
          </div>
          <hr></hr>
          <Button onClick={handleonclick}> Add to cart</Button>

        </CardBody>
      </Card>
    );
}
export default Cardg;