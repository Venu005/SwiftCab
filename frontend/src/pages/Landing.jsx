import { Link } from "react-router-dom";
export const Landing = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://ideogram.ai/assets/image/lossless/response/OdgFqiZ_QnibOxyjrZzZzg)]  h-screen  pt-8 flex justify-between flex-col w-full">
        <img
          className="w-16 ml-9"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber-logo"
        />
        <div className="bg-white pb-7 py-4 px-4">
          <h2 className="text-3xl font-bold">Get started with Uber</h2>
          <Link
            to={"/login"}
            className=" flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};