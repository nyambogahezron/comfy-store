interface InputProps {
	placeholder?: string;
	className?: string;
	type?: string;
}

export const Input = ({ placeholder, className, type = "text" }: InputProps) => {
	return <input type={type} placeholder={placeholder} className={className} />;
};
