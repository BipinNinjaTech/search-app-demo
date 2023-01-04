import { FC } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./index.scss";

interface IProps {
  onChange: (value: string) => void;
  searchValue: string;
  handleSearch: () => void;
  clearSearch: () => void;
}

const SearchInput: FC<IProps> = (props) => {
  const { onChange, searchValue, handleSearch, clearSearch } = props;
  return (
    <Paper className="search">
      <IconButton className="search__icon">
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search"
        onChange={(e) => onChange(e.target.value)}
        value={searchValue}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <IconButton type="button" onClick={clearSearch}>
        <CloseIcon />
      </IconButton>
      <IconButton type="button" onClick={handleSearch}>
        <ArrowForwardIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
