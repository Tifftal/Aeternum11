import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import { Minio, URI } from "../../api/config";

// ... (other imports)

const WishlistCard = ({ data, onRemove }) => {
    const [photo, setPhoto] = useState('')
    const navigate = useNavigate();

    const handleDeleteFromWishlist = (id) => {
        onRemove(id); // Notify the parent component about the delete action
    }

    const redirectToItem = () => {
        // ... (unchanged code)
        navigate(`/product/${data.id}`); // Navigate to the specified product page
    }

    useEffect(() => {
        let isMounted = true; // Add a variable to track the component's mount state
    
        const fetchData = async () => {
            try {
                const response = await api.get(`${URI}/good/${data.id}`);
                const good = response.data;
    
                const fetchPhoto = async (photo) => {
                    try {
                        const imageUrl = `${Minio}/${photo.path}`
    
                        
    
                        // Check if the component is still mounted before updating the state
                        if (isMounted) {
                            setPhoto(imageUrl);
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
    
                const photo = good.photos.sort((a, b) => a.position - b.position)
                const firstPhoto = photo[0]
    
                // Check if the component is still mounted before calling fetchPhoto
                if (isMounted && firstPhoto) {
                    await fetchPhoto(firstPhoto)
                }
            }
            catch(error) {
                console.error(error);
            }
        };
    
        fetchData();
    
        // Cleanup function to update the isMounted variable when the component is unmounted
        return () => {
            isMounted = false;
        };
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.id]); // Include dependencies in the dependency array
    

    return (
        <div>
            <div className="wishlist-card">
                <img src={photo || "../../../IMG/carlos-torres-MHNjEBeLTgw-unsplash.jpg"} alt="test" onClick={redirectToItem} style={{ cursor: "pointer", backgroundColor: "white" }} />
                <div className="nameOfCloth">
                    <Link to={`/product/${data.id}`} style={{ textDecoration: "none", color: "white" }}>
                        <h1 className="wish-card-name">{data.name}</h1>
                    </Link>
                </div>
                <p>{data.cost} ₽ </p>
                <button className="removeBtn" onClick={() => { handleDeleteFromWishlist(data.id) }}>Удалить</button>
            </div>
        </div>
    )
}

export default WishlistCard;
