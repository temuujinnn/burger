import { React, Fragment } from "react";
import { connect } from "react-redux";
import MenuItem from "../MenuItem";
import css from "./style.module.css";

const Menu = (props) => (
  <div>
    <ul className={css.Menu}>
      {props.userId ? (
        <Fragment>
          <MenuItem link="/logout">ГАРАХ</MenuItem>
          <MenuItem exact link="/">
            Шинэ захиалга
          </MenuItem>
          <MenuItem link="/orders">Захиалгууд</MenuItem>
        </Fragment>
      ) : (
        <Fragment>
          <MenuItem link="/login">НЭВТРЭХ</MenuItem>
          <MenuItem link="/signup">БҮРТГҮҮЛЭХ</MenuItem>
        </Fragment>
      )}
    </ul>
  </div>
);
const mapStateToProps = (state) => {
  return {
    userId: state.signupReducer.userId,
  };
};
export default connect(mapStateToProps)(Menu);
