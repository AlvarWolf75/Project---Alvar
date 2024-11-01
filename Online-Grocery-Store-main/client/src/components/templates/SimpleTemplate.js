import React from "react";
import { Footer, Header, SideMenu } from "../organisms";
import { setSelectedCategory } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SimpleTemplate = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuNavigation = (category) => {
    dispatch(setSelectedCategory(category));
    navigate("/");
  };

  return (
    <>
      <Header />
      <div style={styles.contentStyle}>
        <SideMenu handleNavigation={handleMenuNavigation} />
        <div style={styles.container}>{children}</div>
      </div>
      <Footer />
    </>
  );
};
const styles = {
  contentStyle: {
    height: window.innerHeight - 80,
    backgroundColor: "#fff",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 30,
    gap: 30,
    overflow: "hidden",
  },
  container: {
    backgroundColor: "#fff",
    width: "85%",
    height: window.innerHeight - 80,
    overflow: "scroll",
  },
};

export default SimpleTemplate;
