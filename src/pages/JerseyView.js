import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../styles/jerseyView.css';
import Review from '../components/Review';

function JerseyView(props) {
  const usernameStored = localStorage.getItem("username");

  const initialState = {
    username: usernameStored,
  }

  const [jersey, setJersey] = useState([]);
  const [size, setSize] = useState('S');
  const [item, setItem] = useState(initialState);

  const navigate = useNavigate();
  const params = useParams();
  const jerseyId = params.id;

  const handleSort = async (e) => {
    e.preventDefault();
    const selectedSize = e.target.value;
    setSize(selectedSize)
    console.log(size)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameStored) {
      alert('You must login to add to your wishlist')
    }
    try {
      const response = await fetch(`https://jersey-shop-backend.herokuapp.com/jerseys/${jerseyId}/wishlist`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          size,
          ...item,
        }),
      });
      await response.json();
      navigate(`/wishlist`)
    } catch (error) {
      console.log(error);
    }
    setItem(initialState);
  }

  const url = `https://jersey-shop-backend.herokuapp.com/jerseys/${jerseyId}`

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
            <form className="wishlist-form" onSubmit={handleSubmit} >
              <select className='select-size' onChange={handleSort}>
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
      <Review user={props.user} />
    </>
  )
}

export default JerseyView;