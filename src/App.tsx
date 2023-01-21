import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Table from "./pages/Table";
import Header from "./layout/Header";
import { data } from "./constants/mock";
import "./App.scss";

interface IResultProp {
  parentTitle: string;
  childTitle: string;
  subChildTitle: string;
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [resultList, setResultList] = useState<IResultProp[]>([]);
  const [filterList, setFilterList] = useState<IResultProp[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const resultListArray: IResultProp[] = [];
    data.forEach((item) => {
      const parentTitle = item.title;
      item?.content?.forEach((subItem) => {
        const childTitle = subItem.title;
        subItem?.content?.forEach((childItem) => {
          const subChildTitle = childItem.title;
          resultListArray.push({ parentTitle, childTitle, subChildTitle });
        });
      });
    });
    setResultList(resultListArray);
    setFilterList(resultListArray);
  }, []);

  const onChangeSearchText = (text: string) => {
    setSearchValue(text);
  };

  const handleSearchResult = () => {
    const filterResults = resultList.filter(
      (item) =>
        item.parentTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.childTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
        item.subChildTitle.toLowerCase().includes(searchValue.toLowerCase())
    );
    setPage(1);
    setFilterList(filterResults);
  };

  return (
    <div className="main">
      <Router>
        <Header
          searchValue={searchValue}
          handleSearchResult={handleSearchResult}
          onChangeSearchText={onChangeSearchText}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={
              <Search filterList={filterList} page={page} setPage={setPage} />
            }
          />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
