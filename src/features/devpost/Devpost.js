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
      <div className="max-w-md bg-white shadow-md rounded-lg overflow-hidden mb-4">
        <div className="p-4">
          <div className="relative">
            <h2 className="text-2xl font-bold mb-2 ml-12">{devpost.title}</h2>
            <p className="text-gray-600">DATE: {devpost.date}</p>
            <p className="text-gray-600">Location: {devpost.location}</p>
            <p className="text-gray-600">Note: {devpost.prize}</p>
            <div className="flex justify-center items-center mt-4">
              <img
                src={devpost.imagesrc}
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

const memoizedDevpost = memo(Devpost);
export default memoizedDevpost;
