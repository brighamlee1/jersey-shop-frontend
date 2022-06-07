import { useState, useEffect } from 'react';

function Jerseys(props) {
    const [jerseys, setJerseys] = useState([]);

    const getJerseysData = async () => {
        const response = await fetch(props.URL + '/jerseys');
        const data = await response.json();
        setJerseys(data);
    };

    useEffect(() => {
        getJerseysData();
    }, []);

    return (
        <>
            {jerseys.map((jersey, idx) => (
                <div key={idx}>
                    <img src={jersey.image} alt={jersey.team} />
                    <h2>{jersey.name} {jersey.team} Jersey</h2>
                    <p>${jersey.price}</p>
                </div>
            ))}
        </>);
}

export default Jerseys;