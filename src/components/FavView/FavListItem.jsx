import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
export default function FavListItem({ gif }) {
    const dispatch = useDispatch();
    const categories = useSelector(store => store.categoryList);
    const [assignedCategory, setAssignedCategory] = useState("");

    // Need to dispatch put request to updated text of button so that the images can be filtered later
    const setCategory = (e) => {
        dispatch({ type: "SET_CATEGORY", payload: { category_id: e.target.dataset.category, id: e.target.closest("div").dataset.id } });

    }

    return (
        <>
            <div className="w3-container">
                <li key={gif.id}><img src={gif.gif_url} /></li>
                <div className="w3-dropdown-hover w3-light-grey">
                    {/* button text conditionally renders based on what is in store. dropdowns set store */}
                    <span><button className="w3-button">Assign Catgory</button>
                        <button className="w3-button">Delete</button></span>
                    <div data-gifid={gif.fav_id} className="w3-dropdown-content w3-bar-block w3-border">
                        {categories.length === 0 ? <h2>Loading...</h2> :
                            categories.map(category => (
                                <button onClick={(setCategory)} key={category.id} data-category={category.id} className="w3-bar-item w3-button">{category.name}</button>
                            ))}
                    </div>
                </div>
            </div>
        </>
    )
}