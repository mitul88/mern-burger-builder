import React, { Component } from "react";
import {Button, Modal, ModalBody} from "reactstrap"; 
import { Navigate } from "react-router-dom";

import axios from "axios";

import {connect} from 'react-redux';

import env from "react-dotenv";

import Spinner from "../../Spinner/Spinner";

import { resetIngredients } from '../../../redux/actionCreators';

const firebase_api =env.API_URL;


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        canPurchase: state.canPurchase,
        userId: state.userId,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class Checkout extends Component {
    
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        navigateBack : null,
        isLoading: false,
        isModalOpen: false,
        modalMsg: ""
    }
    
    goBack = () => {
        this.setState({navigateBack: "/"})
    }

    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values, 
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {
        this.setState({isLoading: true});
        const order = {
            ingredients: this.props.ingredients,
            customerInfo: this.state.values,
            price: this.props.totalPrice,
            orderCreatedAt: new Date(),
            userId: this.props.userId
        }
        axios.post(firebase_api+"/orders.json?auth=" + this.props.token, order)
            .then(response=> {
                console.log(response.status)
                if(response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully"
                    });
                    this.props.resetIngredients();         
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Please Place your Order again"
                    }); 
                }
            })
            .catch(err=> {
                this.setState({isLoading: false});
            })
            console.log(this.props.canPurchase)
    }

    render() {

        let form = (
            <div>
                <h4 style={{
                    border:"1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px"
                }}>
                    Payment: {this.props.totalPrice} 
                </h4>

                <form style={{
                    border:"1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px"
                }}>
                    <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Address" onChange={(e)=>this.inputChangeHandler(e)}></textarea>
                    <br />
                    <input name="phone" className="form-control" value={this.state.values.phone} placeholder="Your Phone Number" onChange={(e)=>this.inputChangeHandler(e)} />
                    <br />
                    <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e)=>this.inputChangeHandler(e)}>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="bKash">bKash</option>
                    </select>
                    <br />
                    <Button 
                        style={{backgroundColor: "#d70f64"}} 
                        className="me-auto" 
                        onClick={this.submitHandler}
                        disabled={!this.props.canPurchase}>
                            Place Order
                        </Button>
                    <Button color="secondary" className="ms-1" onClick={this.goBack}>Cancel</Button>
                </form>
            </div>
        )

        if (this.state.navigateBack && this.state.navigateBack === "/") {
            return <Navigate to={this.state.navigateBack} />
          }

        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form }
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);