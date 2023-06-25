import '../styles/review.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/wishlist.css';

function Wishlist() {
    const currentUserId = localStorage.getItem("id");
    const [wishlist, setWishlist] = useState(null);
    const params = useParams();
    let userId = params.id;
    userId = currentUserId;

    const getWishlist = async () => {
        const response = await fetch(`https://jersey-closet.onrender.com/jerseys/${userId}/wishlist`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data2 = await response.json();
        setWishlist(data2);
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
    const jerseys = wishlist.wishListJersey;

    return (
        <div className="wishlist-big-container">
            <h2>Your Wishlist</h2>
            <div className="wishlist-labels-container">
                <div className="wishlist-labels">
                    <p className="label-product">PRODUCT</p>
                    <div className="wishlist-labels-data">
                        <p className="label-blank"></p>
                        <p className="label-size">SIZE</p>
                        <p className="label-price">PRICE</p>
                    </div>
                </div>
            </div>
            {
                jerseys.map((jersey) => (
                    <div className="wishlist-container">
                        <div className="wishlist">
                            <div className="wishlist-image-box">
                                <img className="wishlist-image" src={jersey.image} alt={jersey.name} />
                            </div>
                            <div className="wishlist-data">
                                <h3 className="wishlist-name">{jersey.name} {jersey.team} Jersey</h3>
                                <p className="wishlist-size">{jersey.size}</p>
                                <p className="wishlist-price">${jersey.price}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Wishlist;