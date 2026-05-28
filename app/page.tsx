import { CustomizationFlow } from "@/components/customization/CustomizationFlow";

export default function Home() {
  return (
    <div className="app-viewport">
      <div className="phone-frame" role="application" aria-label="Picati 定制应用">
        <CustomizationFlow />
      </div>
    </div>
  );
}
