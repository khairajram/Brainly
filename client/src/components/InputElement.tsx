type InputProps = {
  placeholder: string;
  size: "sm" | "md" | "lg";
  refre: (el: HTMLInputElement | null) => void;
  type?: string;
  defaultValue?: string;
};

const widthClasses = {
  sm: "w-40",
  md: "w-64",
  lg: "w-80",
};

const defaultStyle = "text-center p-2.5 bg-gray-300 border-0 rounded-xl";

export function InputElement(props: InputProps) {
  return (
    <div>
      <input
        ref={props.refre}
        type={props.type ?? "text"}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        className={`${defaultStyle} ${widthClasses[props.size] || "w-auto"}`}
      />
    </div>
  );
}
