import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchValue, updateData, updateSearchValue } from "./HomeSlice";

export default function Home() {
  const data = useSelector((state) => {
    return state.home;
  });

  const inputValue = useSelector(searchValue);

  const dispatch = useDispatch();

  function handleClickSearchButton(value) {
    axios.get(`https://api.github.com/search/users?q=${value}`).then((res) => {
      const searchData = res.data.items;

      dispatch(updateData(searchData));
    });
  }

  const handleChangeSearchValue = (event) => {
    sessionStorage.setItem("searchValue", event.target.value);
    dispatch(updateSearchValue(event.target.value));
  };
  useEffect(() => {
    const inputValue = sessionStorage.getItem("searchValue");

    if (inputValue) {
      dispatch(updateSearchValue(inputValue));
    }
  }, []);

  useEffect(() => {
    if (inputValue !== "") {
      handleClickSearchButton(inputValue);
    }
  }, []);

  console.log("data?.userData", data?.userData);

  return (
    <div
      className="w-[100%] bg-[rgb(13,17,23)] flex flex-col "
      style={{ minHeight: "100vh" }}
    >
      <div className="h-10 mt-10 mx-auto">
        <input
          type="text"
          onChange={(e) => {
            handleChangeSearchValue(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClickSearchButton(inputValue);
            }
          }}
          value={inputValue}
          className={`h-8 md:w-[40rem] md:font-medium md:h-12 pl-4 rounded-3xl `}
          placeholder="Enter  GitHub Id"
        />

        <button
          onClick={() => {
            handleClickSearchButton(inputValue);
          }}
          disabled={inputValue === ""}
          style={{ cursor: `${inputValue === "" ? "not-allowed" : "pointer"}` }}
          className="rounded-2xl px-3 ml-3 md:px-6 py-1 md:py-2 font-medium bg-sky-700"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
        {data?.userData.map((i) => (
          <div
            key={i.id}
            className="w-full mt-4 p-4 border border-gray-500 rounded-lg flex flex-col items-center pb-10"
          >
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={i.avatar_url}
              alt="userImg"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {i?.login}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {i?.type}
            </span>
            <div className="flex mt-4 md:mt-6">
              <a
                href={`${i.html_url}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
