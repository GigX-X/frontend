import { Button } from "@/components/ui/button";
import BoxReveal from "@/components/magicui/BoxReveal";

export async function CtaBox() {
  return (
    <div className="h-[50%] w-auto max-w-[50%] my-auto items-center justify-center overflow-hidden pt-8">
      <BoxReveal boxColor={"#3346F0"} duration={0.5}>
        <p className="text-[3rem] font-atkinson font-bold text-blackfaded leading-[3.6rem]">
          The Dynamic <br />
          Shift Solution.
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"#3346F0"} duration={0.5}>
        <div className="mt-[1.1rem] w-full">
          <p className="text-blackfaded font-atkinson font-thin text-lg leading-[1.87rem] text-wrap">
            FlexForce's Dynamic Shift Solution empowers businesses to conquer
            fluctuating demand through a blend of skilled adaptable workers,
            cutting-edge scheduling software, and real-time performance
            analytics.
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"#3346F0"} duration={0.5}>
        <div className="mt-[0.8rem] flex flex-row gap-2">
            <Button variant={"allBlue"}>Start Hiring</Button>
            <Button variant={"revBlack"}>Start Working</Button>
        </div>
      </BoxReveal>
    </div>
  );
}
