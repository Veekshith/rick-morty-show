import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Form, Image } from "react-bootstrap";
import CharactersList from "./characters/CharactersList";
import { CustomContainer } from "./common/CommonStyles";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Pagination from "./pagination/Pagination";
import Header from "./header/Header";
import Filters from "./Filters";

function App() {
  const [charactersListState, setCharactersListState] = useState({
    results: [],
    info: {}
  });
  const [pageResults, setPageResults] = useState([]);
  const filters = ["origin", "gender", "species"];
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortType, setSortType] = useState("noSort");
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    setFilterOptions([]);
    setSearchKeyword("");
    setCharactersListState({
      results: [],
      info: {}
    });
    loadData();
  }, [pageNumber]);

  useEffect(() => {
    sortList();
  }, [sortType]);

  useEffect(() => {
    const filteredList = [],
      filteredIds = new Set(),
      uniqueValues = new Set();
    for (const { name: filterName, options } of filterOptions) {
      let tempFilteredList = [];
      for (const { option, isSelected } of options) {
        tempFilteredList = charactersListState.results.filter(item => {
          const filter = item[filterName];
          return typeof filter === "object"
            ? filter.name === option && isSelected
            : filter === option && isSelected;
        });
        filteredList.push(...tempFilteredList);
      }
    }
    for (const item of filteredList) {
      filteredIds.add(item.id);
    }
    for (const id of filteredIds) {
      for (const item of filteredList) {
        if (item.id === id) uniqueValues.add(item);
      }
    }
    let sortedList = Array.from(uniqueValues);

    sortedList = sortedList.length
      ? getSortedList(sortedList)
      : getSortedList(charactersListState.results);
    setPageResults(sortedList);
  }, [filterOptions]);

  const loadData = async () => {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${pageNumber}`
    );
    setCharactersListState(data);
    setPageResults(getSortedList(data.results));
    for (const key of filters) {
      const uniqueValues = new Set(),
        uniqueValuesArr = [];
      for (const item of data.results) {
        uniqueValues.add(
          typeof item[key] === "object" ? item[key].name : item[key]
        );
      }
      for (const uniqueValue of uniqueValues) {
        uniqueValuesArr.push({ option: uniqueValue, isSelected: false });
      }
      setFilterOptions(prevState => {
        return [...prevState, { name: key, options: uniqueValuesArr }];
      });
    }
  };

  const onPageChange = type => {
    switch (type) {
      case "first":
        return setPageNumber(1);
      case "prev":
        if (pageNumber > 1) setPageNumber(prevState => --prevState);
        break;
      case "next":
        if (pageNumber < charactersListState.info.pages)
          setPageNumber(prevState => ++prevState);
        break;
      case "last":
        return setPageNumber(charactersListState.info.pages);
      default:
        throw new Error();
    }
  };
  const onSearch = () => {
    if (searchKeyword) {
      let foundCharacters = [];
      foundCharacters = charactersListState.results.filter(({ name }) => {
        return name.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1;
      });
      setPageResults(foundCharacters);
    } else setPageResults(charactersListState.results);
  };

  const onSearchKeywordChange = e => {
    setSearchKeyword(e.target.value);
  };

  const sortList = () => {
    const list = pageResults.length ? pageResults : charactersListState.results;
    setPageResults(getSortedList(list));
  };
  const getSortedList = list => {
    let sortedList = [];
    if (list.length) {
      if (sortType === "asc")
        sortedList = list.sort((item1, item2) => item1.id - item2.id);
      else if (sortType === "desc")
        sortedList = list.sort((item1, item2) => item2.id - item1.id);
      else if (sortType === "noSort") sortedList = list;
    }
    return Array.from(sortedList);
  };
  const applyFilter = (e, filterName) => {
    const { name: filterOption, checked: isChecked } = e.target;
    let processedFilterOptions = JSON.parse(JSON.stringify(filterOptions));
    for (let item of processedFilterOptions) {
      if (item["name"] === filterName) {
        for (let option of item.options) {
          if (option.option === filterOption) {
            option.isSelected = isChecked;
            break;
          }
        }
        break;
      }
    }
    setSearchKeyword("");
    setFilterOptions(Array.from(processedFilterOptions));
  };
  const closeFiltersModal = () => {
    setShowFilters(false);
  };
  const showFiltersModal = () => {
    setShowFilters(true);
  };
  return (
    <CustomContainer className="container">
      <Header>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search by name"
            aria-label="Search by name"
            aria-describedby="basic-addon2"
            value={searchKeyword}
            onChange={onSearchKeywordChange}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={onSearch}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Control
            as="select"
            value={sortType}
            onChange={e => setSortType(e.target.value)}
          >
            <option value="noSort">No Sort</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Form.Control>
        </Form.Group>
        <Image
          src="./funnel.png"
          style={{ width: "1rem", height: "1rem" }}
          onClick={showFiltersModal}
        />
        <Filters
          filterOptions={filterOptions.length ? filterOptions : []}
          onChangeHandler={applyFilter}
          show={showFilters}
          handleClose={closeFiltersModal}
        ></Filters>
        <Pagination pageNumber={pageNumber} onPageChange={onPageChange} />
      </Header>
      <main>
        <CharactersList charactersList={pageResults}></CharactersList>
      </main>
    </CustomContainer>
  );
}

export default App;
