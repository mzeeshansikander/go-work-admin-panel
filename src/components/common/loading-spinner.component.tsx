import { ClipLoader } from "react-spinners";

interface Props {
  size?: number;
  color?: string;
}
export default function LoadingSpinner({ color, size }: Props) {
  return <ClipLoader size={size ? size : 28} color={color ? color : "white"} />;
}
