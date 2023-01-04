import { FC, useState } from "react";

interface IListItemProp {
    parentTitle: string;
    childTitle: string;
    subChildTitle: string;
}

interface IProps {
  results: IListItemProp[];
}

const List: FC<IProps> = ({ results }) => {
  return (
    <div>
      {results.map((res) => {
        return (
          <div>
            <p>{res.parentTitle}</p>
            <p>{res.childTitle}</p>
            <p>{res.subChildTitle}</p>
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default List;
