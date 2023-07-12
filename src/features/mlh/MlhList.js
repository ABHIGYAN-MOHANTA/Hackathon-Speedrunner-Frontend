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

  if (isLoading) content = <PulseLoader color={"#1f2937"} />;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tableContent}
      </div>
    );
  }

  return content;
};
export default MlhList;
