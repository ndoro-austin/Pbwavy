import dynamic from "next/dynamic";
const Aboutpage = dynamic(() => import("../../components/Aboutpage"));

export default function About() {
  return <Aboutpage />;
}
