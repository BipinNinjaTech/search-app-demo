import { FC } from "react";
import Pagination from "@mui/material/Pagination";
import Divider from "@mui/material/Divider";
import "./index.scss";

interface IListItemProp {
  parentTitle: string;
  childTitle: string;
  subChildTitle: string;
}

interface IProps {
  results: IListItemProp[];
  totalResultsCount: number;
  page: number;
  setPage: (page: number) => void;
}

const List: FC<IProps> = (props) => {
  const { results, totalResultsCount, page, setPage } = props;

  const indexOfLastElement = page * 5;
  const indexOfFirstElement = indexOfLastElement - 5;
  const currentList = results.slice(indexOfFirstElement, indexOfLastElement);

  return (
    <div className="list">
      <p>
        {totalResultsCount} {totalResultsCount > 1 ? "results" : "result"} found
      </p>
      <Divider />
      {currentList.map((res, index) => {
        return (
          <div key={index}>
            <h3>{res.parentTitle}</h3>
            <p>{res.childTitle}</p>
            <p>{res.subChildTitle}</p>
            <br></br>
          </div>
        );
      })}
      {totalResultsCount > 0 && (
        <Pagination
          count={Math.ceil(totalResultsCount / 5)}
          page={page}
          onChange={(_e, page) => setPage(page)}
          className='pagination'
        />
      )}
    </div>
  );
};

export default List;
