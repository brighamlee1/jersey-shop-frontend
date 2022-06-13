import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/jerseys.css';

function Jerseys(props) {
    const [jerseys, setJerseys] = useState([]);
    const [search, setSearch] = useState('');

    const filterData = jerseys.filter(jersey => {
        return Object.keys(jersey).some(key => {
            return jersey[key].toString().toLowerCase().includes(search.toLowerCase());
        })
    }
    )
    const url = props.url + '/jerseys';
    const getJerseysData = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setJerseys(data.sort((a, b) => {
            return a.name > b.name ? 1 : -1
        }));
    };

    const handleChange = async (e) => {
        await e.preventDefault();
        setSearch(e.target.value.toLowerCase());
        console.log(e.target.value.toLowerCase())
    }

    const onClick = () => {
        setSearch('');
    }

    function handleSort(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.value === "A-Z") {
            const sortedAToZ = [...jerseys].sort((a, b) => {
                return a.name > b.name ? 1 : -1
            });
            setJerseys(sortedAToZ);
        }
        else if (e.currentTarget.value === "Z-A") {
            const sortedZToA = [...jerseys].sort((a, b) => {
                return b.name > a.name ? 1 : -1
            });
            setJerseys(sortedZToA);
        }
        else if (e.currentTarget.value === "Price, Highest To Lowest") {
            const sortedHighToLow = [...jerseys].sort((a, b) => {
                return b.price > a.price ? 1 : -1
            });
            setJerseys(sortedHighToLow);
        }
        else if (e.currentTarget.value === "Price, Lowest To Highest") {
            const sortedLowToHigh = [...jerseys].sort((a, b) => {
                return a.price > b.price ? 1 : -1
            });
            setJerseys(sortedLowToHigh);
        }
    }

    useEffect(() => {
        getJerseysData(url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="search-big-container">
                <div className="search-container">
                    <span className="sort">
                        <label className="sort-label">Sort By: </label>
                        <select onChange={handleSort}>
                            <option value="A-Z">A-Z</option>
                            <option value="Z-A">Z-A</option>
                            <option value="Price, Lowest To Highest">Price, Lowest To Highest</option>
                            <option value="Price, Highest To Lowest">Price, Highest To Lowest</option>
                        </select>
                    </span>
                    <span className="search-box"> <label className="search-label">Search:</label>
                        <input className="search" onChange={handleChange} />
                    </span>
                </div>
            </div>
            <div className="jerseys-container">
                {filterData.map((jersey, idx) => (
                    <>
                        <Link className="jersey-link" to={`/jerseys/${jersey._id}`} key={jersey.name} onClick={onClick}>
                            <div className="jersey-box" key={idx}>
                                <img className="jersey-image" src={jersey.image} alt={jersey.team} />
                                <h2 className="description">{jersey.name} {jersey.team} Jersey</h2>
                                <p className="price">${jersey.price}</p>
                            </div>
                        </Link>
                    </>
                ))}
            </div>
        </>
    );
}

export default Jerseys;