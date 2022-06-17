import '../styles/review.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function Review(props) {
    const currentUser = localStorage.getItem("username");

    const initialReview = {
        stars: Number,
        text: '',
        date: '',
        username: currentUser
    };

    const [reviews, setReviews] = useState('');
    const [review, setReview] = useState(initialReview);

    const params = useParams();
    const jerseyId = params.id;

    const navigate = useNavigate();

    const getReviews = async () => {
        const response = await axios.get(`https://jersey-shop-backend.herokuapp.com/jerseys/${jerseyId}/review`, { headers: { "Content-Type": "application/json" } })
        setReviews(response);
        // navigate(window.location);
    }

    const handleChange = ({ currentTarget: input }) => {
        setReview({ ...review, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = localStorage.getItem("accessToken");
        if (review.stars > 5) {
            return alert('You may not rate this jersey more than 5 stars')
        }
        else if (review.stars < 1) {
            return alert('You may not rate this jersey less than 1 star')
        }
        else if (!user) {
            return alert('You must be signed in to make a review')
        }
        try {
            const url = `http://localhost:4000/jerseys/${jerseyId}/review`;
            const res = await axios.post(url, review, { headers: { "Content-Type": "application/json" } })
            res.status(200).json(res);
            navigate(window.location)
        } catch (error) {
            console.log(error);
        }
        setReview(initialReview);
        getReviews();
    }

    useEffect(() => {
        getReviews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const allReviews = reviews.data;
    console.log(allReviews)

    return (
        <>
            <h1 className="form-review-title">Write a Review</h1>
            <div className="review-container">
                <form className="review-form" onSubmit={handleSubmit}>
                    <div className="input-box review-input-box">
                        <label>Rating</label>
                        <input className="review-inputs" type="number" name="stars" value={review.stars} onChange={handleChange} />
                    </div>
                    <div className="input-box review-input-box">
                        <label>Message</label>
                        <textarea className="review-inputs message" name="text" value={review.text} onChange={handleChange}></textarea>
                    </div>
                    <input className="signup-button" type="submit" value="Submit Review" />
                </form>
            </div>

            <>
                {!allReviews ? (<h1>No Reviews Found</h1>) : (
                    <>
                        <h1 className="reviews-title">Reviews</h1>
                        <div className="reviews">
                            {allReviews?.slice(0)?.reverse()?.map((review, idx) => {
                                const list = (
                                    <div className="review" key={idx}>
                                        <p className="date">{new Date(review.createdAt).toLocaleString()}</p>
                                        <p className="review-stars"><i className="fa-solid fa-star"></i> {review.stars} <span className="username">{review.user.username}</span> </p>
                                        <h2 className="review-text">{review.text}</h2>
                                    </div>
                                )
                                return list;
                            })}
                        </div>
                    </>
                )
                }
            </>
        </>
    )
}

export default Review;