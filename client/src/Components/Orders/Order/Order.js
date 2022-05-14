import React from "react";


const Order = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
       return <span 
                key={item.type}
                style={{
                    border: "1px solid grey",
                    borderRadius: "5px",
                    padding: "5px",
                    marginRight: "10px" 
                }}>
                    {item.amount}x  
                    <span style={{textTransform:"capitalize"}}>
                        - {item.type}
                    </span>
            </span>
    })
    return (
        <div style={{
            border: "1px solid grey",
            boxShadow: "1px1px #88888",
            borderRadius: "5px",
            padding: "20px",
            marginBottom: "10px" 
        }}>
             <p>Order No: {props.order.id} </p>
             <p>Delivery Address: {props.order.customerInfo.deliveryAddress} </p>
             <hr />
                {ingredientSummary}
             <hr />
             <p>Total : {props.order.price}BDT</p>
        </div>
    )
}

export default Order;