import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';



function SignUp() {
     
    const [details, setdetails] = useState({name:"",email:"",password:"",location:""})
    const formhandle =async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser",{
            method:'POST',
            headers:{
                'Content-Type' :'application/json'
            },
            body:JSON.stringify({name:details.name,email:details.email,password:details.password,location:details.location})
        });

        const json= await response.json()
        console.log(json);

        if(!(json.success))
        {
            alert("Enter Valid Details")
        }

    }
    const onChange=(e)=>{
        setdetails({...details,[e.target.name]:e.target.value})
    }
    return (
        <div style={{background:"white"}}>
            <Form onSubmit={formhandle} className='container'>
                <FormGroup>
                    <Label for="examplename">Name</Label>
                    <Input type="text" name="name" value={details.name}  placeholder="name placeholder" onChange={onChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" value={details.email}  placeholder="with a placeholder" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password"  value={details.password} placeholder="password placeholder" onChange={onChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="examplelocation">Location</Label>
                    <Input type="text" name="location" value={details.location} placeholder="Location placeholder" onChange={onChange}/>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" />{' '}
                        Check me out
                    </Label>
                </FormGroup>
                <Button type='submit' className='m-3 btn btn-success'>Submit</Button>
                <Link  to="/login"  className="m-3 btn btn-danger"> Login</Link>
            </Form>
        </div>
    );
}
export default SignUp;