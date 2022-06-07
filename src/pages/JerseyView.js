import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/jerseyView.css';

function JerseyView(props) {

  const [jersey, setJersey] = useState([]);

  const params = useParams();
  const jerseyId = params.id;

  const url = `${props.URL}/jerseys/${jerseyId}`

  const getJersey = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setJersey(data);
  }

  useEffect(() => {
    getJersey();
  }, [])

  return (
    <>
      <div className="view-jersey-container">
        <img className="view-jersey-image" src={jersey.image} alt={jersey.team} />
        <div>
          <h2 className="view-description">{jersey.name} {jersey.team} Jersey</h2>
          <p className="view-price">${jersey.price}</p>
        </div>
        <form>
          <input type="text" name="text" />
          <input type="number" name="stars" />
          <input type="submit" value="Submit Review" />
        </form>
        <form>
          <select>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
          <input type="submit" value="Add to Wishlist" />
        </form>
      </div>
    </>
  )
}

export default JerseyView;