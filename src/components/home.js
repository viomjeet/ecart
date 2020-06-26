import React from 'react'
import { Jumbotron, Button, Carousel } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            carouselPhotos: [],
            picsumPhotos: []
        }
        console.warn = () => { }
    }

    componentWillMount() {

    }

    componentDidMount() {
        const carouselPhotos = this.state.carouselPhotos;
        const picsumPhotos = this.state.picsumPhotos;
        fetch("https://picsum.photos/v2/list?page=2&limit=3").then(response => response.json())
            .then(images => {
                images.forEach(items => {
                    carouselPhotos.push(items);
                    this.setState({ carouselPhotos })
                })
            }).catch(error => console.log(error));
        fetch("https://picsum.photos/v2/list?page=1&limit=4").then(response => response.json())
            .then(picsum => {
                picsum.forEach(items => {
                    picsumPhotos.push(items);
                    this.setState({ picsumPhotos })
                })
            }).catch(error => console.log(error));
    }
    render() {
        const carouselPhotos = this.state.carouselPhotos;
        const picsumPhotos = this.state.picsumPhotos;
        return (
            <div>
                <Carousel className="ecart-carousel">
                    {
                        carouselPhotos.map(items => {
                            return (
                                <Carousel.Item className="ecart-carousel-item" key={items.id}>
                                    <img src={items.download_url} alt="First slide" />
                                    <Carousel.Caption>
                                        <h3>{items.author}</h3>
                                        <a className="ecart-link" href="#">Download</a>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>

                <Jumbotron className="text-center">
                    <h1>eCart, world!</h1>
                    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p><a className="ecart-link" href="#">Learn More...</a></p>
                </Jumbotron>

                <div className="container">
                    <div className="ecart-ipsum">
                        <h4 className="ecart-ipsum-title">Know more</h4>
                        <ul className="row list-unstyled">
                            {picsumPhotos.map(items => {
                                return (
                                    <li key={items.id} className="col-md-3">
                                        <div className="ecart-ipsum-in">
                                            <img className="d-block w-100" src={items.download_url} />
                                            <footer>

                                                <span><i className="fad fa-at"></i> {items.author.slice(0, 10) + '...'}</span>

                                                <a href="#">More...</a>
                                            </footer>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}
export default Home;
