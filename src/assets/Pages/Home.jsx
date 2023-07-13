import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../Components/Card";

const Home = () => {
  let items = useSelector((store) => store.itemStore.items);

  let [search, setSearch] = useState('')

  let [filterProduct, setFilterProduct] = useState([])

  const dispatch = useDispatch();

  const loadData = () => {
    if (items.length == 0) {
      return fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "load_data", payload: data.products }))
        .catch((error) => console.log(error));
    }
    filter_Product()
  };

  
  useEffect(loadData, [search]);
  
  const filter_Product = () => {
    if(search==''){
      setFilterProduct(items)
    }
    else{
      setFilterProduct(
        items.filter(item=>item.title.toLowerCase().match(search.toLowerCase()))
        )
    }
  }
  return (
    <>
    <div className="bg-dark py-2">
      <input type="search" className="form-control w-50 py-2  mx-auto"  onKeyUp={e=>setSearch(e.target.value)}/>
    </div>
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-lg-4 g-4">
          {filterProduct.length > 0 &&
            filterProduct.map((item) => {
              return (
                <Card item={item}  key={item.id}/>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
