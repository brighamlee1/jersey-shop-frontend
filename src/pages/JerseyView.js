import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/jerseyView.css';
import Review from '../components/Review';

function JerseyView(props) {

  const [jersey, setJersey] = useState([]);
  // const [size, setSize] = useState('S');

  const params = useParams();
  const jerseyId = params.id;

  const url = `http://localhost:4000/jerseys/${jerseyId}`

  const getJersey = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setJersey(data);
  }

  // const url2 = `http://localhost:4000/jerseys/${jerseyId}`

  // const getSize = async () => {
  //   const response = await fetch(url2);
  //   const data = await response.json();
  //   setSize(data);
  // }

  useEffect(() => {
    getJersey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="view-jersey-container">
        <div className="view-jersey-image-box">
          <img className="view-jersey-image" src={jersey.image} alt={jersey.team} />
          <div className="price-description">
            <h2 className="view-description">{jersey.name} {jersey.team} Jersey</h2>
            <p className="view-price">${jersey.price}</p>
            <form className="wishlist-form" >
              <select className='select-size'>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              <br />
              <input type="submit" value="ADD TO WISHLIST" className="wishlist-button" />
            </form>
          </div>
        </div>
      </div>
      <Review />
    </>
  )
}

export default JerseyView;