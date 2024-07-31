import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Batch from "./Batch";

const API_URL = "https://localhost:7216/";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("jwtToken");
  //console.log("JWT Token siddhi:", token);
  
  if (!token) {
    throw new Error("No JWT token found in localStorage");
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`, // Include the token in the request headers
    ...options.headers,
  };
  console.log("Request URL:",  url);

  console.log("Request Headers:", headers);

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};
 
export default fetchWithAuth;
