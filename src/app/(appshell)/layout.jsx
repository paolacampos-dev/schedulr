import { Suspense } from "react";
import Header from "@/components/Header";

export default function SchedulerLayout({ children }) {
    return (
    <>
        <Suspense fallback={null}>
            <Header />
        </Suspense>
            {children}
    </>
    );
}