import ReactLoading from "react-loading";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-mindchat-bg-dark">
      <ReactLoading
        type="spinningBubbles"
        color="#ffffff"
        height="50px"
        width="50px"
      />
    </div>
  );
}
