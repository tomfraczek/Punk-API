import React, {useState, useEffect} from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";


function Beer({match}) {

    useEffect(() => {
        fetchItem();
        console.log(match);
    }, []);

    const [item, setItem] = useState({});

    const fetchItem = async () => {
        const fetchItem = await fetch(
            `https://api.punkapi.com/v2/beers/${match.params.id}`
        );
        const item = await fetchItem.json();
        setItem(item[0]);
        console.log(item);
    }


    return (
        <div className='beer-full'>
            <img src={`${item.image_url}`} alt=""/>

            <div className="beer-full-info--wrapper">
                <h1>{item.name}</h1>
                {/*checking if the data exists*/}
                {
                    item.abv ? <p className="beer-full-info">ABV: {item.abv}</p> : null
                }
                {
                    item.attenuation_level ? <p className="beer-full-info">Attenuation level: {item.attenuation_level}</p> : null
                }
                {
                    item.boil_volume ? <p className="beer-full-info">Boil volume: {item.boil_volume.value} {item.boil_volume.unit}</p> : null
                }
                {
                    item.ebc ? <p className="beer-full-info">EBC: {item.ebc}</p> : null
                }
                {
                    item.first_brew ? <p className="beer-full-info">First brew: {item.first_brew}</p> : null
                }
                {
                    item.ibu ? <p className="beer-full-info">IBU: {item.ibu}</p> : null
                }
                {
                    item.ph ? <p className="beer-full-info">PH: {item.ph}</p> : null
                }
                {
                    item.srm ? <p className="beer-full-info">SRM: {item.srm}</p> : null
                }
                {
                    item.description ? <p className="beer-full-info">{item.description}</p> : null
                }
                {
                    item.food_pairing ? <p className="beer-full-info">The best with:<ul>{item.food_pairing.map((food) => <li>{food}</li>)}</ul></p> : null
                }
                <Link to={'/'}><button className="beer-link--read-more beer--back-button">go back</button></Link>

            </div>
        </div>
    );
}

export default Beer;
