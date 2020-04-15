import React from "react";
import { Pagination as PaginationAlias } from "react-bootstrap";

const Pagination = ({ pageNumber, onPageChange }) => {
  return (
    <PaginationAlias>
      <PaginationAlias.First onClick={() => onPageChange("first")} />
      <PaginationAlias.Prev onClick={() => onPageChange("prev")} />
      <PaginationAlias.Item>{pageNumber}</PaginationAlias.Item>
      <PaginationAlias.Next onClick={() => onPageChange("next")} />
      <PaginationAlias.Last onClick={() => onPageChange("last")} />
    </PaginationAlias>
  );
};

export default Pagination;
