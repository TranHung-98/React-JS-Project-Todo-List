import React from "react";


export function Button() {

  return (

    <button type="submit" className="text-color bg-primary border-radius">Add Task</button>

  );

}

export function ButtonDelete () {

  return(
    <button type="button" className="text-color bg-success border-radius" disabled>Delete</button>
  )

}



