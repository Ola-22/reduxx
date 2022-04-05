import Axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { setUsers } from "./actions";
import { makeSelectUsers } from "./selectors";
import { UsersList } from "./usersList";

const stateSelector = createSelector(makeSelectUsers, (users) => ({
  users,
}));

const actionDispatch = (dispatch) => ({
  setUser: (users) => dispatch(setUsers(users)),
});
export default function HomePage(props) {
  const { users } = useSelector(stateSelector);
  const { setUser } = actionDispatch(useDispatch());

  const fetchUsers = async () => {
    const response = await Axios.get("https://reqres.in/api/users").catch(
      (err) => {
        console.log("Err", err);
      }
    );
    setUser(response.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  console.log(users);
  return (
    <div>
      <UsersList />
    </div>
  );
}
