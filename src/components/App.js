import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toyArray, setToyArray] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then(res => res.json())
    .then(data => setToyArray(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleNewToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(data => {
      let updatedArray = [...toyArray, data];
      setToyArray(updatedArray)
    })
  }

  function handleDeleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      let updatedArray = toyArray.filter(toy => toy.id !== id)
      setToyArray(updatedArray)
    })
  }
  
  function handleLikeToy(id, likes) {
    let newLikesObj = {likes: likes + 1}
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newLikesObj)
    })
    .then(res => res.json())
    .then(data => {
      let updatedArray = [...toyArray]
      updatedArray[updatedArray.findIndex(el => el.id === id)] = data
      setToyArray(updatedArray)
    })
  }
 
  return (
    <>
      <Header />
      {showForm ? <ToyForm handleNewToy={handleNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toyArray} deleteToy={handleDeleteToy} likeToy={handleLikeToy} />
    </>
  );
}

export default App;
