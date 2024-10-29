import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove, set } from "firebase/database";

const Home = () => {
  const [menuArr, setMenuArr] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null); // For storing selected product
  const [showModal, setShowModal] = useState(false); // For controlling modal visibility

  // State for editable fields
  const [mealCategory, setMealCategory] = useState("");
  const [mealName, setMealName] = useState("");
  const [mealAdds, setMealAdds] = useState("");
  const [mealPrice, setMealPrice] = useState("");
  const [mealCost, setMealCost] = useState("");
  const [mealStocks, setMealStocks] = useState("");

  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, "Menu/ComboMeals");
    const snapshot = await get(dbRef);

    if (snapshot.exists()) {
      const myData = snapshot.val();
      const tempArr = Object.keys(myData).map((firebaseId) => ({
        ...myData[firebaseId],
        MenuId: firebaseId,
      }));
      setMenuArr(tempArr);
    } else {
      alert("No data found");
    }
  };

  const deleteMenu = async (MenuIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, `Menu/ComboMeals/${MenuIdParam}`);
    await remove(dbRef);

    setMenuArr(menuArr.filter((item) => item.MenuId !== MenuIdParam));
  };

  // Open modal and load data into input fields
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setMealCategory(product.MealCategory);
    setMealName(product.MealName);
    setMealAdds(product.MealAdds);
    setMealPrice(product.MealPrice);
    setMealCost(product.MealCost);
    setMealStocks(product.MealStocks);
    setShowModal(true);
  };

  const updateProduct = async () => {
    const db = getDatabase(app);
    const productRef = ref(db, `Menu/ComboMeals/${currentProduct.MenuId}`);

    await set(productRef, {
      MealCategory: mealCategory,
      MealName: mealName,
      MealAdds: mealAdds,
      MealPrice: mealPrice,
      MealCost: mealCost,
      MealStocks: mealStocks,
    });

    // Update the product in state
    const updatedMenu = menuArr.map((item) =>
      item.MenuId === currentProduct.MenuId
        ? {
            ...item,
            MealCategory: mealCategory,
            MealName: mealName,
            MealAdds: mealAdds,
            MealPrice: mealPrice,
            MealCost: mealCost,
            MealStocks: mealStocks,
          }
        : item
    );
    setMenuArr(updatedMenu);
    setShowModal(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Menu</h2>
      <div className="row mb-3">
        <div className="col">
          <Link className="btn btn-primary me-1" to="/write" role="button">
            Create Product
          </Link>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => {
              fetchData();
              window.location.reload();
            }}
          >
            Refresh
          </button>
        </div>
        <div className="col"></div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Cost</th>
            <th>Stock#</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {menuArr.map((menu, index) => (
            <tr key={index}>
              <td>{menu.MealCategory}</td>
              <td>{menu.MealName}</td>
              <td>{menu.MealAdds}</td>
              <td>{menu.MealPrice}</td>
              <td>{menu.MealCost}</td>
              <td>{menu.MealStocks}</td>
              <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                <button
                  className="btn btn-primary btn-sm me-1"
                  onClick={() => openEditModal(menu)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteMenu(menu.MenuId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Meal Category"
                  value={mealCategory}
                  onChange={(e) => setMealCategory(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Meal Name"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Meal Adds"
                  value={mealAdds}
                  onChange={(e) => setMealAdds(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Meal Price"
                  value={mealPrice}
                  onChange={(e) => setMealPrice(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Meal Cost"
                  value={mealCost}
                  onChange={(e) => setMealCost(e.target.value)}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Meal Stocks"
                  value={mealStocks}
                  onChange={(e) => setMealStocks(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={updateProduct}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
