import React, { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [inputvalue1, setInputvalue1] = useState("");
  const [inputvalue2, setInputvalue2] = useState("");
  const [inputvalue3, setInputvalue3] = useState("");
  const [inputvalue4, setInputvalue4] = useState("");
  const [inputvalue5, setInputvalue5] = useState("");
  const [inputvalue6, setInputvalue6] = useState("");

  const navigate = useNavigate(); // Hook to handle navigation

  const saveData = async () => {
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "Menu/ComboMeals"));
    set(newDocRef, {
      MealCategory: inputvalue1,
      MealName: inputvalue2,
      MealAdds: inputvalue3,
      MealPrice: inputvalue4,
      MealCost: inputvalue5,
      MealStocks: inputvalue6,
    })
      .then(() => {
        alert("Data saved successfully");
        navigate("/"); // Redirect to the home page after saving
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a Product</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Meal Category"
            value={inputvalue1}
            onChange={(e) => setInputvalue1(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Meal Name"
            value={inputvalue2}
            onChange={(e) => setInputvalue2(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control"
            placeholder="Meal Description"
            value={inputvalue3}
            onChange={(e) => setInputvalue3(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Meal Price"
            value={inputvalue4}
            onChange={(e) => setInputvalue4(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Meal Cost"
            value={inputvalue5}
            onChange={(e) => setInputvalue5(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Meal Stocks"
            value={inputvalue6}
            onChange={(e) => setInputvalue6(e.target.value)}
          />
        </div>
      </div>

      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={saveData}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Write;
