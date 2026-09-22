import Homehero from "@/components/home/homehero";
import Homeprovide from "@/components/home/homeprovide";
import Homedeliver from "@/components/home/homedeliver";
import Homefocus from "@/components/home/homefocus";
import Homedecade from "@/components/home/homedecade";
import Homeclient from "@/components/home/homeclient";
import Homesecurity from "@/components/home/homesecurity";
import Homeknowledge from "@/components/home/homeknowledge";
import Homebulid from "@/components/home/homebulid";
import Homedicuss from "@/components/home/homedicuss";
import HomeLogic from "@/components/home/homelogic";

// Step 3: Short cache for Homepage (5 minutes / 300 seconds ISR)
export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Homehero />
      <Homeprovide />
      <Homedeliver />
      <Homefocus />
      <Homedecade />
      <Homeclient />
      <Homesecurity />
      <Homeknowledge />
      <Homebulid />
      <Homedicuss />
      <HomeLogic />
    </>
  );
}
