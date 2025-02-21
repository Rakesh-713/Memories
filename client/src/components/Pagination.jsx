import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/postsActions";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const numberOfPages = useSelector((state) => state.posts.numberOfPages);
  console.log(numberOfPages, "numberofpagesss");

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      style={{ justifyContent: "space-around" }}
      count={numberOfPages}
      color="primary"
      variant="outlined"
      page={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
