import NavBar from "@/component/NavBar";
import MyDropzone from "../component/MyDropzone";
export default function Home() {
  return (
    <div className=" bg-neutral-50">
      <NavBar/>
      <div className="flex mt-2 p-2 sm:mt-32 items-center justify-center w-full sm:w-1/2 mx-auto">
      <MyDropzone />
      </div>
      
    </div>
  );
}
