import React, { useEffect } from "react";
import { auth, provider } from "../firebase";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      }
    });
  }, []);

  const signIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      let user = result.user;
      dispatch(
        setUserLogin({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
      history.push("/");
    });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Nav>
      <Link to={`/`}>
        <Logo src="/images/logo.svg" />
      </Link>
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a>
              <img src="/images/home-icon.svg" />
              <span>HOME</span>
            </a>

            <a>
              <img src="/images/search-icon.svg" />
              <span>SERACH</span>
            </a>

            <a>
              <img src="/images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>

            <a>
              <img src="/images/original-icon.svg" />
              <span>ORIGINALS</span>
            </a>

            <a>
              <img src="/images/movie-icon.svg" />
              <span>MOVIES</span>
            </a>

            <a>
              <img src="/images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg onClick={signOut} src="/images/myPhoto.jpg" />
        </>
      )}
    </Nav>
  );
}

export default Header;

const Nav = styled.div`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  //padding: 0 36px;
  padding: 0 calc(3.5vw + 5px);
  max-width: calc(100vw);
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1; //this will make navMenu take the maximum space available hence pushes the profile img to the end
  margin-left: 20px;
  align-items: center;

  a {
    display: flex; //to align items horizontally
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      //after means that a div after the span
      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0; // visiblity -> gone
        trasform-origin: left center; //transit from left to center
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s; //250ms is the total time of animation, 0s is the start of animation
        transform: scaleX(0); //width of the line
      }
    }

    // This effect takes place when we "hover" over it
    // '&' concatanates hover to the 'a'
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1; // visibility -> visible
      }
      img {
        //transform: scale(1.1);
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%; //this will make the photo curved upto half. anyvalue above 50 does the same
  cursor: pointer; //this will make the cursor a hand when we hover over it
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.6);
  transition: all 0.2s ease 0s;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;
