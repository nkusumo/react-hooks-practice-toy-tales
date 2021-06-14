import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, deleteToy, likeToy={likeToy}}) {

  return (
    <div id="toy-collection">
      {toys.map(toy => <ToyCard key={toy.id} id={toy.id} name={toy.name} image={toy.image} likes={toy.likes} deleteToy={deleteToy} likeToy={likeToy} />)}
    </div>
  );
}

export default ToyContainer;
