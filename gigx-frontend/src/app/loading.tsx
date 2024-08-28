import Ripple from "@/components/magicui/Ripple";

export default function RippleDemo() {
  return (
    <div className="h-100vh">
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden my-auto">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-bold tracking-tighter text-white font-atkinson">
          GIGGX
        </p>
        <Ripple />
      </div>
    </div>
  );
}
