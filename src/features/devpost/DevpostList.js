import { useGetDevpostQuery } from "./devpostApiSlice";
import Devpost from "./Devpost";
import { PulseLoader } from "react-spinners";

const DevpostList = () => {
  const {
    data: devpost,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetDevpostQuery("devpostList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <>
        <PulseLoader color={"#FFF"} />
        <h3>Devpost is a dynamically rendered site, please wait a bit!</h3>
      </>
    );

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  if (isSuccess) {
    const { ids } = devpost;
    const tableContent = ids?.length
      ? ids.map((devpostId) => {
          return <Devpost key={devpostId} devpostId={devpostId} />;
        })
      : null;

    content = (
      <table className="table table--devpost">
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
              Prize
            </th>
            <th scope="col" className="table__th user__username">
              Image
            </th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }

  return content;
};
export default DevpostList;
