import { useGetMlhQuery } from "./mlhApiSlice";
import { memo } from "react";

const Mlh = ({ mlhId }) => {
  const { mlh } = useGetMlhQuery("mlhList", {
    selectFromResult: ({ data }) => ({
      mlh: data?.entities[mlhId],
    }),
  });

  if (mlh) {
    return (
      <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <div className="relative">
            <div className="absolute top-3 left-3 -mt-3 -ml-3">
              <img
                src={mlh.logo}
                alt="event logo"
                className="w-8 h-8 object-cover rounded-full"
              />
            </div>
            <h2 className="text-2xl font-bold mb-2 ml-12">{mlh.name}</h2>
            <p className="text-gray-600">DATE: {mlh.eventdate}</p>
            <p className="text-gray-600">Location: {mlh.eventlocation}</p>
            <p className="text-gray-600">Note: {mlh.eventnote}</p>
            <div className="flex justify-center items-center mt-4">
              <img
                src={mlh.imageurl}
                alt="event background"
                className="w-100 h-100 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
};

const memoizedMlh = memo(Mlh);
export default memoizedMlh;
