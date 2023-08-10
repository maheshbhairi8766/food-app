import React, { useEffect, useState } from "react";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import Cardg from "./Cardg";
import Carouselg from "./Carouselg";
import Footerg from "./Footerg";
function Home() {
    const [search, setsearch] = useState('')
    const [fooditem, setfooditem] = useState([]);
    const [foodcat, setfoodcat] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            }
        });


        response = await response.json();

        setfooditem(response[0]);
        setfoodcat(response[1]);
    }
    useEffect(() => {
        loadData()
    }, [])
    return (
        <div>
            
            <Carouselg />
            <div>
                <div className=" justify-content-center d-flex" style={{width:800,marginLeft:350}}>
                    <input className="form-control inline"  type="search" value={search} style={{borderRadius:"20px",margin:15}} placeholder="Search" aria-label="Search" onChange={(e) => {
                        setsearch(e.target.value)
                    }} />

                </div>
            </div>
            <div className="container">
                {
                    foodcat !== []
                        ? foodcat.map((data) => {
                            return (
                                <div className=" row mb-3">

                                    <div key={data._id} style={{color:"white",fontSize:20}}>{data.CategoryName}</div>

                                    <hr />
                                    {
                                        fooditem !== []
                                            ?
                                            fooditem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                .map(filterItems => {
                                                    return (
                                                        <div className="col-lg-3 " key={filterItems._id} >
                                                            <Cardg fooditem={filterItems}
                                                                options={filterItems.options[0]}
                                                            ></Cardg>
                                                        </div>
                                                    )
                                                })
                                            :
                                            <div>"No items Available of this Category"</div>
                                    }

                                </div>
                            )
                        }) : ""


                }
            </div>
            <Footerg />
        </div>
    );
}
export default Home;