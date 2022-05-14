import { Card, CardBody, CardFooter, CardHeader, Button } from "reactstrap";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div className="me-auto ms-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
        </div>
    )
}


const Controls = props => {
    return (
        <div className="container ml-md-5" style={{textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    backgroundColor: "#d70f64",
                    color: "#fff"
                }}>
                    <h4>Add Ingredients</h4>
                </CardHeader>
                <CardBody>
                    {
                        controls.map(item=> {
                            return <BuildControl 
                                 label={item.label} 
                                 type={item.type}
                                 added={()=> props.ingredientAdded(item.type)}
                                 removed={()=> props.ingredientRemoved(item.type)}
                                 key={Math.random()*1000000} 
                               />
                        })
                    }
                </CardBody>
                <CardFooter>
                    <h5>
                        Price: {props.price} BDT
                    </h5>
                </CardFooter>
                <Button style={{backgroundColor: "#d70f64" }} disabled={!props.canPurchase} onClick={props.toggleModal} color="success">Order Now</Button>
            </Card>
        </div>
    )
}

export default Controls;