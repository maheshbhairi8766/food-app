import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';


export default function Login() {

    const [details, setdetails] = useState({email:"",password:""})
    let navigate= useNavigate()
    const handleform= async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({email:details.email,password:details.password}))
        const response = await fetch("http://localhost:5000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:details.email,password:details.password})
        });

        const json =await response.json();
        console.log(json);

        if(!(json.success))
        {
            alert("Enter Valid Details");
        }
        else{
            localStorage.setItem("useremail",details.email)
            localStorage.setItem("authtoken",json.authtoken)
            console.log(localStorage.getItem("authtoken"))
            navigate("/")
        }
    }

    const onchange=(e)=>{
        setdetails({...details,[e.target.name]:e.target.value})
    }
  return (

    <div style={{backgroundColor:"white"}}>
            <Form onSubmit={handleform} className='container' >
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" value={details.email} placeholder="with a placeholder" onChange={onchange} />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" value={details.password} placeholder="password placeholder" onChange={onchange} />
                </FormGroup>
            
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" />{' '}
                        Check me out
                    </Label>
                </FormGroup>
                <Button type='submit'>Submit</Button>
                
            </Form>
        </div>
  );
}
