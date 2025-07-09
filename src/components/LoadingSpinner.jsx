import { Spin } from "antd";
import "antd/dist/reset.css";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-transparent">
      <Spin tip="Loading map..." size="large" style={{ color: "#222" }} />
    </div>
  );
}