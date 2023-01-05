import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import "./index.scss";

interface IProps {
  onChange: (value: string) => void;
  searchValue: string;
  handleSearch: () => void;
  clearSearch: () => void;
}

const SearchInput: FC<IProps> = (props) => {
  const navigate = useNavigate();

  const { onChange, searchValue, handleSearch, clearSearch } = props;

  const handleSearchAction = () => {
    handleSearch();
    navigate("/search");
  };

  return (
    <Paper className="search">
      <InputBase
        placeholder="Search"
        className="search__inputBox"
        onChange={(e) => onChange(e.target.value)}
        value={searchValue}
      />
      <IconButton type="button" onClick={clearSearch}>
        {searchValue && <CloseIcon />}
      </IconButton>
      <IconButton type="button" onClick={handleSearchAction}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
