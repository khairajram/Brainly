import { CrossIcon } from "../icons/CrossIcon";

type ModelProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateContentModel(props : ModelProps){
  if (!props.open) return null; // Don't render when closed

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-20">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <div 
          onClick={ () => {props.onClose (false)}} 
          className="absolute top-2 right-2 text-gray-600 hover:text-black ease-in-out transition-all duration-500 cursor-pointer"
        >
          <CrossIcon size="lg"/>
        </div>
        <span className="block text-lg font-semibold">Hi there</span>
      </div>
    </div>
  );
}