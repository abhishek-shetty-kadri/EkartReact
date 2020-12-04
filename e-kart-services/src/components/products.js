import React from 'react';
import NavBar from './navbar';

class ProductsComponent extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            searchName:'',
            products: [
                {
                    "id": 1,
                    "pdtName": "Gamia Laptop",
                    "pdtPrice": 33000,
                    "pdtCode": "1",
                    "pdtDescription": "An excellent choice for an awesome gaming experience.",
                    "pdtCategory": "Electronics",
                    "rating": 3,
                    "purchasedUser": "roopa",
                    "pdtImg": "/images/Laptop.jpg",
                    "isReturned": true
                },
                {
                    "id": 2,
                    "pdtName": "Ind Mobile EX321",
                    "pdtPrice": 8999,
                    "pdtCode": "2",
                    "pdtDescription": "This will take you to next level of communication.",
                    "pdtCategory": "Electronics",
                    "rating": 4,
                    "purchasedUser": "rimika",
                    "pdtImg": "/images/Mobile.png",
                    "isReturned": false
                },
                {
                    "id": 3,
                    "pdtName": "Khaadi Shirt",
                    "pdtPrice": 982,
                    "pdtCode": "3",
                    "pdtDescription": "Best suitable for tropical climate.",
                    "pdtCategory": "Costumes",
                    "rating": 4,
                    "purchasedUser": "roopa",
                    "pdtImg": "/images/shirt.jpg",
                    "isReturned": true
                },
                {
                    "id": 4,
                    "pdtName": "SungSam Headphones",
                    "pdtPrice": 2200,
                    "pdtCode": "4",
                    "pdtDescription": "Excellent bluetooth headphones with good sound quality",
                    "pdtCategory": "Electronics",
                    "rating": 2,
                    "purchasedUser": "khalid",
                    "pdtImg": "/images/headphones.png",
                    "isReturned": false
                }
            ]}
    }
    productDetails = (e) => {
        this.props.history.push(`/productdetails/${e}`);
    }
    render() {
        let filteredProducts = this.state.products.filter(x => x.pdtName.toLowerCase().startsWith(this.state.searchName.toLowerCase()));
        return (
            <React.Fragment>
                <NavBar />
                <br />
                <br />
                <div style={{ borderRadius: "5px", border: "2px solid black", margin: "10px" }}>
                    <h1 className="title">Products</h1>
                    <div style={{ padding: "10px" }}>
                        <div className="col-sm-1"></div>
                        <div style={{ textAlign: "left" }}>
                            <span style={{ backgroundColor: '#f2f2f2', height:"38px" }} className="btn glyphicon glyphicon-search"></span><input style={{ height: "36px" }} type="text" onChange={(e) => { this.setState({ searchName: e.target.value }) }} placeholder="Search Product" />
                        </div>
                    </div><br />



                    {filteredProducts && filteredProducts[0] ?
                        filteredProducts.map((prod, index) => {
                            if (index % 3 === 0 && filteredProducts[index]) {
                                return (<div className="row" key={index}>
                                    <div className="col-sm-1"></div>
                                    <div className="col-sm-3">
                                        {filteredProducts[index] ?
                                            <div className="thumbnail text-center" style={{ height: "300px" }} align="center">
                                                <div>
                                                    <img style={{ height: "200px", width: "280px", margin: "10px" }} src={filteredProducts[index].pdtImg} alt="abc" />
                                                    <h3 onClick={()=>this.productDetails(filteredProducts[index].id)} style={{ color: "blue", cursor: "pointer" }}><b>{filteredProducts[index].pdtName}</b></h3>
                                                </div>
                                            </div>
                                            :null
}

                                    </div>
                                    <div className="col-sm-3">
                                        {filteredProducts[index+1] ?
                                            <div className="thumbnail text-center" style={{ height: "300px" }} align="center">
                                                <div>
                                                    <img style={{ height: "200px", width: "280px", margin: "10px" }} src={filteredProducts[index + 1].pdtImg} alt="abc" />
                                                    <h3 onClick={()=>this.productDetails(filteredProducts[index+1].id)} style={{ color: "blue", cursor:"pointer" }}><b>{filteredProducts[index + 1].pdtName}</b></h3>
                                                </div>
                                            </div>
                                            : null
                                        }

                                    </div>

                                    <div className="col-sm-3">
                                        {filteredProducts[index+2] ?
                                            <div className="thumbnail text-center" style={{ height: "300px" }} align="center">
                                                <div>
                                                    <img style={{ height: "200px", width: "280px", margin: "10px" }} src={filteredProducts[index + 2].pdtImg} alt="abc" />
                                                    <h3 onClick={()=>this.productDetails(filteredProducts[index+2].id)} style={{ color: "blue", cursor: "pointer" }}><b>{filteredProducts[index + 2].pdtName}</b></h3>
                                                </div>
                                            </div>
                                            : null
                                        }

                                    </div>

                                        </div>
                                    )
                            }

                        })

                        : <h3 style={{ textAlign:"center" }}>No Products Found</h3>}
                </div>               
                                        
            </React.Fragment>
            );
    }
}
export default ProductsComponent;