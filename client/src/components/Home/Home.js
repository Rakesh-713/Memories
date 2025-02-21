import {
  AppBar,
  Button,
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
} from "@mui/material";
import { MuiChipsInput } from "mui-chips-input";
import React, { useEffect, useState } from "react";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getPostsBySearch } from "../../store/postsActions";
import Paginate from "../Pagination";
import { useLocation, useNavigate } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  console.log(posts, "posts");
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("none");
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   if (page) dispatch(getPosts(page));
  // }, [page]);

  const handleSearchPost = () => {
    debugger;
    if (search.trim() || tags) {
      debugger;
      dispatch(getPostsBySearch({ search, tags }));
      navigate(`/posts/search?searchQuery=${search}&tags=${tags.join(",")}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      handleSearchPost();
    }
  };

  const handleAdd = (tag) => {
    let newTags = [];
    tags.forEach((item) => {
      newTags.push(item);
    });
    newTags.push(tag);
    console.log(newTags, "tagssss");
    setTags(newTags);
  };
  const handleDeleteChip = (tag) => {
    let newTags = tags.filter((item) => item !== tag);
    setTags(newTags);
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          // flexDirection="column-reverse"
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          style={{
            "@media (maxWidth: 600px)": {
              container: {
                flexDirection: "column-reverse",
              },
            },
          }}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              style={{
                borderRadius: "4",
                marginBottom: "1rem",
                display: "flex",
                padding: "16px",
              }}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                onKeyDown={handleKeyDown}
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                variant="outlined"
                label="Search Memories"
                type="text"
              />
              <MuiChipsInput
                variant="outlined"
                style={{ margin: "10px 0" }}
                value={tags}
                onDeleteChip={handleDeleteChip}
                label="Search Tags"
                onChange={(e) => handleAdd(e[e.length - 1])}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSearchPost}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper elevation={6}>
                <Paginate
                  style={{
                    borderRadius: 4,
                    marginTop: "1rem",
                    padding: "16px",
                  }}
                  page={page}
                />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
