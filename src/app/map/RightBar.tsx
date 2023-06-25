import Spolight from "./Spolight";
import Library from "./Library";
import Output from "./Output";
export default function RightBar() {
  return (
    <div className="flex h-full flex-col gap-5 bg-mindchat-bg-dark p-5">
      <div className="h-1/5 rounded-xl border border-mindchat-secondary">
        <Spolight />
      </div>
      <div className="h-1/5 rounded-xl border border-mindchat-secondary ">
        <Library />
      </div>
      <div className="h-3/5 rounded-xl border border-mindchat-secondary ">
        <Output />
      </div>
    </div>
  );
}
