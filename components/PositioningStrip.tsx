export function PositioningStrip() {
  return (
    <div className="bg-[#1a1d27] border-y border-[#2d3148] py-6">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[#f0f0f0] font-semibold text-base mb-3">
          You need to know what breaks first, what follows, and where the real exposure sits.
        </p>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {["Shock", "Pressure", "Spillover", "Exposure", "Watchpoints", "Decision"].map((item, i, arr) => (
            <span key={item} className="flex items-center gap-2">
              <span className="text-amber-500 font-bold text-sm">{item}</span>
              {i < arr.length - 1 && <span className="text-[#2d3148]">→</span>}
            </span>
          ))}
        </div>
        <p className="text-[#9ca3af] text-sm leading-relaxed">
          ShockBridge Pulse maps the transmission chain from shock to decision. So you can move from noise to structure with speed.
        </p>
      </div>
    </div>
  );
}
