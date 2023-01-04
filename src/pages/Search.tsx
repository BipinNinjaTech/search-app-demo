import { FC, useState, useEffect } from "react";
import SearchInput from "../componets/SearchInput";
import List from "../componets/List";
import { data } from "../constants/mock";

interface IResultProp {
  parentTitle: string;
  childTitle: string;
  subChildTitle: string;
}

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const [searchValue, setSearchValue] = useState("");
  const [resultList, setResultList] = useState<IResultProp[]>([]);
  const [filterList, setFilterList] = useState<IResultProp[]>([]);

  useEffect(() => {
    const resultListArray: IResultProp[] = [];
    data.forEach((item) => {
      const parentTitle = item.title;
      item?.content?.map((subItem) => {
        const childTitle = subItem.title;
        subItem?.content?.map((childItem) => {
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
    setFilterList(filterResults);
  };

  return (
    <div>
      <SearchInput
        searchValue={searchValue}
        onChange={onChangeSearchText}
        handleSearch={handleSearchResult}
        clearSearch={() => onChangeSearchText("")}
      />
      <List results={filterList} />
    </div>
  );
};

export default Search;
