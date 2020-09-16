import React, { Component } from 'react'

export default class Product extends Component {
    render() {
        const { name, img, intro, discount, id, price, quantity, remaining } = this.props.product;

        return (
            <tr>
                <th scope='row'>
                    <figure className='figure d-md-flex'>
                        <img className='figure-img img-fluid rounded col-md-2 mr-3' src={img} alt='' />
                        <figcaption>
                            <h4>{name}</h4>
                            <p>{intro}</p>
                        </figcaption>
                    </figure>
                </th>
                <td>{discount}%</td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button onClick={() => this.props.onDecrement(this.props.product)} type="button" className="btn btn-outline-dark">-</button>
                        <span className="btn">{quantity}</span>
                        <button onClick={() => this.props.onIncrement(this.props.product)} type="button" className="btn btn-outline-dark">+</button>
                    </div>

                </td>
                <td>${price * quantity}</td>
                <td>
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type='button' className="btn btn-outline-info btn-sm">{remaining} in stock</button>
                        <button type='button' onClick={() => this.props.onDelete(id)} className="btn btn-danger btn-sm">Delete</button>
                    </div>
                </td>
            </tr>
        )
    }
}
