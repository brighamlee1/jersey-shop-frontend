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

    const getJerseysData = async () => {
        const response = await fetch(props.URL + '/jerseys');
        const data = await response.json();
        setJerseys(data);
    };

    const handleChange = async (e) => {
        await e.preventDefault();
        setSearch(e.target.value.toLowerCase());
        console.log(e.target.value.toLowerCase())
    }

    const onClick = () => {
        setSearch('');
    }

    useEffect(() => {
        getJerseysData();
    }, []);

    return (
        <>
            <h1>Search</h1>
            <div className="search-container">
                <input className="search" onChange={handleChange} />
            </div>
            <div className="jerseys-container">
                {filterData.map((jersey, idx) => (
                    <>
                        <Link className="jersey-link" to={`/jerseys/${jersey._id}`} key={idx} onClick={onClick}>
                            <div className="jersey-box" key={jersey.name}>
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