import { useGetDevpostQuery } from "./devpostApiSlice";
import { memo } from "react";

const Devpost = ({ devpostId }) => {
  const { devpost } = useGetDevpostQuery("devpostList", {
    selectFromResult: ({ data }) => ({
      devpost: data?.entities[devpostId],
    }),
  });

  <div className="3.54"></div>;

  if (devpost) {
    return (
      <tr className="table__row user">
        <td className={`table__cell`}>{devpost.title}</td>
        <td className={`table__cell`}>{devpost.date}</td>
        <td className={`table__cell`}>{devpost.location}</td>
        <td className={`table__cell`}>{devpost.prize}</td>
        <td className={`table__cell`}>
          <img
            src={devpost.imagesrc}
            alt="event background"
            style={{ width: "200px" }}
          />
        </td>
      </tr>
    );
  } else return null;
};

const memoizedDevpost = memo(Devpost);
export default memoizedDevpost;
