import { CompanyCloud } from "./hero/CompanyCloud";
import { CtaBox } from "./hero/CtaBox";


export default function Hero() {
    return (
        <>
            <div className="w-4/6 h-auto md:h-[85vh] mx-auto flex flex-col md:flex-row justify-between">
                <CtaBox />
                <CompanyCloud />
            </div>
        </>
    )
}