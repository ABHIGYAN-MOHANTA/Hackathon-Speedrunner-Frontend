import { store } from "../../app/store";
import { commentsApiSlice } from "../comments/commentsApiSlice";
import { postsApiSlice } from "../posts/postsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { mlhApiSlice } from "../mlh/mlhApiSlice";
import { devpostApiSlice } from "../devpost/devpostApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    store.dispatch(
      postsApiSlice.util.prefetch("getPosts", "postsList", { force: true })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      mlhApiSlice.util.prefetch("getMlh", "mlhList", { force: true })
    );
    store.dispatch(
      devpostApiSlice.util.prefetch("getDevpost", "devpostList", {
        force: true,
      })
    );
    store.dispatch(
      commentsApiSlice.util.prefetch("getComments", "commentsList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
