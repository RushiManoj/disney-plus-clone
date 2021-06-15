import React, { useEffect } from "react";
import styled from "styled-components";
import db from "../firebase";
import ImgSlider from "./ImgSlider";
import Movies from "./Movies";
import Viewers from "./Viewers";
import { useDispatch } from "react-redux";
import { setMovies } from "../features/movie/movieSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("movies").onSnapshot((snapshot) => {
      let tempMovies = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      dispatch(setMovies(tempMovies));
    });
  }, []);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Movies />
    </Container>
  );
}

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;

  //before means a div before anything else
  &:before {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed; //fixed means it doesn't change with scroll
    content: "";
    position: absolute;
    top: 0; //these constraints are to the parent
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1; //This makes the image stay in bg
  }
`;
