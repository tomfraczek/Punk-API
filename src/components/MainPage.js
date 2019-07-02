import React, { Component } from 'react';
import { Link } from "react-router-dom";
import spinner from '../assets/spinner.svg'
import '../App.css';

const SingleBeer = (props) => {

    return(
        props.beers.map((beer) =>

            <div className={'beer-link'} key={beer.id} data-id={beer.id}>
                <div className="beer-link-top">
                    <h1 className={'beer-link--name'}>{beer.name}</h1>
                    <p className={'beer-link-subtitle'}>{beer.tagline}</p>
                </div>

                <div className="beer-link--bottom">
                    <img className={'beer-link--img'} src={`${beer.image_url}`} alt={beer.name} />

                    <div className="beer-link--right">
                        {
                            beer.contributed_by ? <p className={'beer-link-info'}>Contributed by: {beer.contributed_by.replace(beer.contributed_by.split(' ')[2], '')}</p> : null
                        }
                        {
                            beer.first_brewed ? <p className={'beer-link-info'}>First brewed: {beer.first_brewed}</p> : null
                        }
                        {
                            beer.ph ? <p className={'beer-link-info'}>PH: {beer.ph}</p> : null
                        }
                        {
                            beer.srm ? <p className={'beer-link-info'}>SRM: {beer.srm}</p> : null
                        }
                        {
                            beer.ibu ? <p className={'beer-link-info'}>IBU: {beer.ibu}</p> : null
                        }
                        {
                            beer.volume ? <p className={'beer-link-info'}>Volume: {beer.volume.value} {beer.volume.unit}</p> : null
                        }
                        
                            <Link to={`/beer/${beer.id}`}>
                                <button className="beer-link--read-more">
                                   Read More
                                </button>
                            </Link>
                    </div>
                </div>


            </div>
        )
    )

}

class MainPage extends Component {
    constructor() {
        super();
        this.allBeers = [];
        this.state = {
            beers: '',
            isLoading: true
        };
    }

    componentDidMount() {
        const self = this;

        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
            })
        }

        fetch('https://api.punkapi.com/v2/beers', requestInfo)
            .then(response => {
                if(response.ok){
                    return response.json();
                } else {
                    throw new Error('Request to get all beers failed');
                }
            })
            .then(beers => {
                self.allBeers = beers;
                // console.log(beers);
                this.setState({
                    beers: beers
                })

                // console.log(this.state.beers);

            });
    }

    render(){

        const sortByName = () => {
            this.setState({beers: this.state.beers.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} )})
        }

        const sortById = () => {
            this.setState({beers: this.state.beers.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} )})
        }

        const sortByPh = () => {
            this.setState({beers: this.state.beers.sort(function(a,b) {return (a.ph > b.ph) ? 1 : ((b.ph > a.ph) ? -1 : 0);} )})
        }

        const sortBySrm = () => {
            this.setState({beers: this.state.beers.sort(function(a,b) {return (a.srm > b.srm) ? 1 : ((b.srm > a.srm) ? -1 : 0);} )})
        }

        const sortByIbu = () => {
            this.setState({beers: this.state.beers.sort(function(a,b) {return (a.ibu > b.ibu) ? 1 : ((b.ibu > a.ibu) ? -1 : 0);} )})
        }

        return (
            <div className="App">
                <div className="sort-buttons">
                    <button className={'sort-button'} onClick={sortByName}>sort by name</button>
                    <button className={'sort-button'} onClick={sortByPh}>sort by ph</button>
                    <button className={'sort-button'} onClick={sortBySrm}>sort by srm</button>
                    <button className={'sort-button'} onClick={sortByIbu}>sort by ibu</button>
                    <button className={'sort-button'} onClick={sortById}>reset</button>

                </div>
                <div className="beer-cards--wrapper">
                    {
                        this.state.beers
                            ? <SingleBeer
                                beers={this.state.beers}
                            />
                            : <img className={'loading-spinner'} src={spinner} alt='Loading'/>
                    }
                </div>
            </div>
        );
    }
}

export default MainPage;
