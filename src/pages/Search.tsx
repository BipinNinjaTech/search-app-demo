import { FC, useState, useEffect } from "react";
import SearchInput from "../componets/SearchInput";
import List from "../componets/List";
import { data } from "../constants/mock";
import "./index.scss";

interface IResultProp {
  parentTitle: string;
  childTitle: string;
  subChildTitle: string;
}

const Search: FC = () => {
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
    <div className="search-page">
      <SearchInput
        searchValue={searchValue}
        onChange={onChangeSearchText}
        handleSearch={handleSearchResult}
        clearSearch={() => onChangeSearchText("")}
      />
      <List
        results={filterList}
        totalResultsCount={filterList.length}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Search;
