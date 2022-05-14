import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../../redux/actionCreators";
import Order from "./Order/Order";
import Spinner from "../Spinner/Spinner"

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId
    }
}

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    componentDidUpdate() {
        // console.log(this.props)
    }
    
    render() {
        let orders = null;
        if(this.props.orderErr) {
                orders = <h3 style={{
                    border: "1px solid grey",
                    boxShadow: "1px1px #88888",
                    borderRadius: "5px",
                    padding: "20px",
                    marginBottom: "10px" 
                }}>Sorry Failed to Load Orders</h3> 
        } else {
            if(this.props.orders.length===0) {
                orders = <h3 style={{
                    border: "1px solid grey",
                    boxShadow: "1px1px #88888",
                    borderRadius: "5px",
                    padding: "20px",
                    marginBottom: "10px" 
                }}>You have no orders</h3> 
            }else {
                orders = this.props.orders.map(order=> {
                    return <Order order={order} key={order.id} />
                 })
            }
        }
        return (
            <div>
                {this.props.orderLoading? <Spinner /> : orders}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);