import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

type ModelProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateContentModel(props : ModelProps){
  if (!props.open) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-20">
      <div className="bg-white p-6 rounded-2xl shadow-lg relative">
        <div 
          onClick={ props.onClose} 
          className="absolute top-2 right-2 text-gray-600 hover:text-black ease-in-out transition-all duration-500 cursor-pointer"
        >
          <CrossIcon size="lg"/>
        </div>
        <InputBox/>
      </div>
    </div>
  );
}


function InputBox(){
  return <div className="pt-4">
    <div className="flex flex-col justify-center gap-4 ">
      <div className="flex flex-col justify-center gap-4 items-center">
        <input className="border-2 border-gray-500 p-1 rounded-xl items-center" type="text" placeholder="title"  />
        <input className="border-2 border-gray-500 p-1 rounded-xl items-center" type="text" placeholder="link"  />
        <input className="border-2 border-gray-500 p-1 rounded-xl items-center" type="text" placeholder="#tag"  />
      </div>
        
      <div className="flex justify-center">
        <Button variant={"primary"} size={"sm"} text={"Add Content"}  onClick={() => {}} />
      </div>
    </div>
  </div>
}