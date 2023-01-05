import List from "../componets/List";
import "./index.scss";

interface IListItemProp {
  parentTitle: string;
  childTitle: string;
  subChildTitle: string;
}

interface IProps {
  filterList: IListItemProp[];
  page: number;
  setPage: (page: number) => void;
}

const Search = (props: IProps) => {
  const { filterList, page, setPage } = props;

  return (
    <div className="search-page">
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
