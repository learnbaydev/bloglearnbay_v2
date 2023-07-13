import React, { useState,useEffect } from "react";
import Link from 'next/link'
import Search from "../../search.json";
import { slugify } from "../../src/utils";
import styles from './search.module.css';
import Image from "next/image";





export default function Sidebar() {
  const [search, setSearch] = useState()
  function findSerach(value) {

    setSearch(value.target.value)
  }

  useEffect(() => {
    // 
    var input = document.getElementById("myInput");
    input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("myBtn").click();
    }
  });
  });
  
  

  return (
   

    <div
      className={styles.container}
    >
      <input
        className={styles.search}
        id="myInput"
        onChange={findSerach}
        type="text"
        placeholder="Enter search term..."
      />
      <Link href={{ pathname: '/Search', query: { q: search?.toLowerCase() } }} id="myBtn" >
      </Link>   

   
    </div>

  )
}