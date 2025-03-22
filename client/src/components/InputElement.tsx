
interface inputPoro{
  placeholder : string;
  size : "sm" | "md" | "lg"
  refre : any
}

const widthClasses = {
  sm: "w-40",
  md: "w-64",
  lg: "w-80",
};


const defaultStyle = "text-center p-2.5 bg-gray-300 border-0 rounded-xl"

export function InputElement(props : inputPoro){
  return <>
    <div>
      <input ref={props.refre} type="text" placeholder={props.placeholder} className={`${defaultStyle} ${widthClasses[props.size] || "w-auto"}`} />
    </div>
  </>
}