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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tableContent}
      </div>
    );
  }

  return content;
};
export default DevpostList;
