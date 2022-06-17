import '../styles/review.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/wishlist.css';

function Wishlist() {
    const currentUserId = localStorage.getItem("id");
    const [wishlist, setWishlist] = useState(null);
    const currentUsername = localStorage.getItem("username");
    const params = useParams();
    let userId = params.id;
    userId = currentUserId;

    const getWishlist = async () => {
        const response = await fetch(`http://localhost:4000/jerseys/${userId}/wishlist`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data2 = await response.json();
        setWishlist(data2);
    }

    const runCallback = (cb) => {
        return cb();
    }

    useEffect(() => {
        getWishlist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (wishlist) {
        console.log(wishlist)
    }
    if (!wishlist) {
        return <h1>No Results Found</h1>
    }
    const sizes = wishlist.wishlistSize;
    const jerseys = wishlist.wishListJersey;
    return (
        <div className="wishlist-big-container">
            <h2>Your Wishlist</h2>
            <div className="wishlist-labels-container">
                <div className="wishlist-labels">
                    <p className="label-product">PRODUCT</p>
                    <p className="label-blank"></p>
                    <p className="label-size">SIZE</p>
                    <p className="label-price">PRICE</p>
                </div>
            </div>
            <div className="wishlist-container">
                {
                    jerseys.map((jersey) => (
                        <div className="wishlist">
                            <img className="wishlist-image" src={jersey.image} alt={jersey.name} />
                            <h3 className="wishlist-name">{jersey.name} {jersey.team} Jersey</h3>
                            <p className="wishlist-size">{jersey.size}</p>
                            <p className="wishlist-price">${jersey.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Wishlist;