import React, { Component } from 'react'
import Product from './product.jsx'
import { Modal, Button, Tabs, Tab, Form } from 'react-bootstrap'

const picURL = 'https://www.kfc.ca/Content/OnlineOrderingImages/StaticPage/story/story_28_lrg.jpg'

export default class ProductList extends Component {
    state = {
        products: [
            {
                id: 1, img: picURL, name: 'Large SmashFries', intro: 'French fries tossed in garlic',
                discount: 20, quantity: 1, remaining: 6, price: 100
            },
            {
                id: 2, img: picURL, name: 'Classic Smash Burger', intro: 'Angus Beef',
                discount: 0, quantity: 1, remaining: 5, price: 100
            },
            {
                id: 3, img: picURL, name: 'Double Bacon Samsh Burger', intro: 'Double certified angus beef',
                discount: 15, quantity: 1, remaining: 4, price: 80
            },
            {
                id: 4, img: picURL, name: 'Double Classic Smash Burger', intro: 'Red onion',
                discount: 20, quantity: 1, remaining: 3, price: 200
            },
            {
                id: 5, img: picURL, name: 'Smash Tots', intro: 'Crispy french fries',
                discount: 30, quantity: 0, remaining: 0, price: 150
            }
        ],
        show: false,
        valid: false
    }

    handleIncrement = p => {
        const products = [...this.state.products];
        const index = products.indexOf(p);
        products[index] = { ...p };
        if (products[index].quantity < products[index].remaining)
            products[index].quantity++;
        this.setState({ products });
    }

    handleDecrement = p => {
        const products = [...this.state.products];
        const index = products.indexOf(p);
        products[index] = { ...p };
        if (products[index].quantity > 0)
            products[index].quantity--;
        this.setState({ products });
    }

    handleDelete = pid => {
        const products = this.state.products.filter(p => p.id !== pid);
        this.setState({ products });
    }

    handleChangeTotal = () => {
        const products = [...this.state.products];
        let total = 0;
        products.map(p => (
            total += p.quantity * p.price * (1 - p.discount / 100)
        ))
        return total.toFixed(2);
    }

    handleReset = () => {
        const products = this.state.products.map(p => {
            p.quantity = 0;
            return p;
        })
        this.setState({ products });
    }

    handleShow = () => this.setState({ show: true });
    handleClose = () => this.setState({ show: false });

    handleSubmit = e => {
        const form = e.target;
        if (form.checkVadility === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.setState({ valid: true });
    }

    render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th className='col'>Product</th>
                            <th className='col'>Discount</th>
                            <th className='col'>Quantity</th>
                            <th className='col'>Price</th>
                            <th className='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.products.map(product => (
                            <Product
                                key={product.id}
                                product={product}
                                onIncrement={this.handleIncrement}
                                onDecrement={this.handleDecrement}
                                onDelete={this.handleDelete}
                            />
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope='row'>
                                <button className='btn btn-warning mr-2' href='#'>
                                    Continue Shopping
                                </button>
                                <button className='btn btn-info' href='#' onClick={this.handleReset}>
                                    Reset
                                </button>
                            </th>
                            <td className='hide-xs'></td>
                            <td className='hide-xs'></td>
                            <td> Total: <span className='font-weight-bold'>${this.handleChangeTotal()}</span></td>
                            <td>
                                <button onClick={this.handleShow} className='btn btn-success'>Checkout</button>
                            </td>
                        </tr>
                        <tr></tr>
                    </tfoot>
                </table>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Checkout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Tabs defaultActiveKey="cc" id="uncontrolled-tab-example">
                            <Tab eventKey="cc" title="Credit Card">
                                <Form novalidate validated={this.state.valid} onSubmit={this.handleSubmit} className='m-2'>
                                    <Form.Group>
                                        <Form.Label>Name on card</Form.Label>
                                        <Form.Control
                                            required
                                            type='text'
                                            placeholder=''
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please fill name.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label className='mt-2'>Credit card number</Form.Label>
                                        <Form.Control
                                            required
                                            type='number'
                                            placeholder='xxxx-xxxx-xxxx-xxxx'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please fill card number.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Row className='ml-1'>
                                        <Form.Group md='6'>
                                            <Form.Label>Exp.</Form.Label>
                                            <Form.Control required type='number' placeholder='MM-YYYY'></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Please fill exp. date.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group md='6' className='ml-2'>
                                            <Form.Label>CVV</Form.Label>
                                            <Form.Control required type='number' placeholder='xxx'></Form.Control>
                                            <Form.Control.Feedback type="invalid">
                                                Need CVV.
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Form.Row>
                                    <Button type="submit">Pay</Button>
                                </Form>
                            </Tab>
                            <Tab eventKey="pp" title="PayPal">
                                <Button className="m-3">My Paypal</Button>
                            </Tab>
                            <Tab eventKey="bank" title="Bank Transfer">
                                <h3 className='m-3'>Bank Information</h3>
                            </Tab>
                        </Tabs>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
