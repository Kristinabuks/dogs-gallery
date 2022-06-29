const loadDogs = () => {
  return async function (dispatch) {
    const rsp = await fetch("http://localhost:8000/dogs");
    const dogs = await rsp.json();
    dispatch({ type: "ADD_DOGS", payload: dogs });
  };
};

export { loadDogs };
