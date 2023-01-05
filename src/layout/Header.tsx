import { useState } from "react";
import { NavLink as Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchInput from "../componets/SearchInput";
import "./index.scss";

interface IProps {
  searchValue: string;
  onChangeSearchText: (value: string) => void;
  handleSearchResult: () => void;
}

export default function Header(props: IProps) {
  const [currentPage, setCurrentPage] = useState("home");
  const { searchValue, onChangeSearchText, handleSearchResult } = props;
  console.log("currentPage", currentPage);
  return (
    <Box className="header">
      <AppBar position="static" className="app-bar">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Link
              to="/"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onClick={() => setCurrentPage("search")}
            >
              Search
            </Link>
          </Typography>

          <SearchInput
            searchValue={searchValue}
            onChange={onChangeSearchText}
            handleSearch={handleSearchResult}
            clearSearch={() => onChangeSearchText("")}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
