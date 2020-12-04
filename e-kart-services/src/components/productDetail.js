import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts, getFeedBacks } from '../Actions/actions';
import NavBar from './navbar';
import RatingComponent from './ratings';

const mapStatesToProps = (state) => {
    return {
        products: state.productReducer.products,
        feedbacks: state.feedBackReducer.feedbacks
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(getProducts),
        getFeedBack: () => dispatch(getFeedBacks)
    }
}
class ProductDetailsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {productSelected:''}
               
    }
    componentDidMount() {
        this.setState({ productSelected: this.props.products.filter(x => x.id.toString() === this.props.match.params.prodid.toString())[0] });
    }
    render() {
        let feedbacksProduct = this.props.feedbacks.filter(x => x.pdtCode.toString() === this.props.match.params.prodid.toString());
        return (
            <React.Fragment>
                <NavBar />
                <br />
                <br />
                

                <div style={{ marginLeft: "3%", marginRight: "3%", borderRadius: "10px", border: "2px solid blue" }}>
                    <Link to="/products"><h3 style={{ color: "blue", cursor: "pointer", textDecoration: "underLine", marginLeft:"30px" }}>&lt;&lt;Go to Products</h3></Link>
                    {this.state.productSelected ?
                        <div>
                            <div className="row">

                                <div className="col-sm-2"></div>
                                <div style={{ borderRadius: "10px", border: "2px solid blue", height: '300px' }} className="col-sm-3" align="center" >
                                    <h1 className="title">{this.state.productSelected.pdtName}</h1>
                                    <img style={{ height: "200px", width: "280px", margin: "10px" }} src={this.state.productSelected.pdtImg} alt="abc" />


                                </div>

                                <div className="col-sm-1"></div>
                                <div className="col-sm-3" style={{ borderRadius: '10px', border: '2px solid blue', height: '300px', textAlign: "center" }}>
                                    <h1 className="title">Product Details</h1>
                                    <br />
                                    <p><b>Product Name: </b>{this.state.productSelected.pdtName}</p>
                                    <p><b>Product Description: </b>{this.state.productSelected.pdtDescription}</p>
                                    <p><b>Product Name: </b>{this.state.productSelected.pdtPrice}</p>
                                    <p><b>Ratings: </b>
                                        <RatingComponent rating={this.state.productSelected.rating} /></p>
                                    <p onClick={() => { this.setState({ reviewsView:true }) }} style={{ color: "blue", cursor: "pointer", fontSize: "20px", textDecoration: "underline" }}>Click to see user reviews</p>
                                </div>

                            </div>
                            <br />
                            {this.state.reviewsView?
                                < div className="row">
                                <div className="col-sm-1"></div>
                            <div style={{ borderRadius: "10px", border: "2px solid blue" }} className="col-sm-9" >
                                <h1 className="title">User Reviews{'(' + feedbacksProduct.length + ')'}</h1>

                                {feedbacksProduct && feedbacksProduct.length > 0 ?
                                    (

                                        feedbacksProduct.map((feedback, index) => {
                                            return (


                                                <div className="row" key={index} style={{ marginLeft: "1%", marginRight: "1%" }}>
                                                    <div clasName="col-sm-3"><p style={{ fontSize: "23px", fontFamily: "sans-serif" }}><b>{feedback.user}</b></p></div>
                                                    <div clasName="col-sm-5"><p>{feedback.body}</p></div>
                                                    <p><RatingComponent rating={feedback.rating}/></p>
                                                    <hr />
                                                </div>



                                            )
                                        })
                                    )

                                    : <h1 style={{ textAlign: "center" }}>No FeedBacks given yet</h1>}


                            </div>
                        </div>:null}
                        </div>
                        : null}

                    <br />
                    <br />
                </div>
            </React.Fragment>)
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(ProductDetailsComponent);