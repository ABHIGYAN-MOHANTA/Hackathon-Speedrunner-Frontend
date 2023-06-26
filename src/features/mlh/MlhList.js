import { useGetMlhQuery } from "./mlhApiSlice";
import Mlh from "./Mlh";
import { PulseLoader } from "react-spinners";

const MlhList = () => {
  const {
    data: mlh,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMlhQuery("mlhList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <PulseLoader color={"#FFF"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = mlh;
    const tableContent = ids?.length
      ? ids.map((mlhId) => {
          return <Mlh key={mlhId} mlhId={mlhId} />;
        })
      : null;

    content = (
      <table className="table table--mlh">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th user__username">
              Eventname
            </th>
            <th scope="col" className="table__th user__roles">
              Date
            </th>
            <th scope="col" className="table__th user__edit">
              Location
            </th>
            <th scope="col" className="table__th user__username">
              Note
            </th>
            <th scope="col" className="table__th user__roles">
              Image
            </th>
            <th scope="col" className="table__th user__edit">
              Logo
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default MlhList;
