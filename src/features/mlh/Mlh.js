import { useGetMlhQuery } from "./mlhApiSlice";
import { memo } from "react";

const Mlh = ({ mlhId }) => {
  const { mlh } = useGetMlhQuery("mlhList", {
    selectFromResult: ({ data }) => ({
      mlh: data?.entities[mlhId],
    }),
  });

  <div className="3.54"></div>;

  if (mlh) {
    return (
      <tr className="table__row user">
        <td className={`table__cell`}>{mlh.name}</td>
        <td className={`table__cell`}>{mlh.eventdate}</td>
        <td className={`table__cell`}>{mlh.eventlocation}</td>
        <td className={`table__cell`}>{mlh.eventnote}</td>
        <td className={`table__cell`}>
          <img src={mlh.imageurl} alt="event background" />
        </td>
        <td className={`table__cell`}>
          <img src={mlh.logo} alt="event logo" />
        </td>
      </tr>
    );
  } else return null;
};

const memoizedMlh = memo(Mlh);
export default memoizedMlh;
