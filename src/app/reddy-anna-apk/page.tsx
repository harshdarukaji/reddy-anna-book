import {
  createLandingPageMetadata,
  LandingPage,
} from "@/components/LandingPage";

const page = {
  path: "/reddy-anna-apk",
  title: "Reddy Anna APK Download — Official Android App (2026)",
  h1: "Reddy Anna APK Download for Android",
  description:
    "Download Reddy Anna APK for Android free. Official reddy anna book apk, reddy anna online book apk install guide, login, and mobile cricket betting setup.",
  keywords: [
    "reddy anna apk",
    "reddy anna apk download",
    "reddy anna book apk",
    "reddy anna online book apk",
    "reddy anna app apk",
  ],
  breadcrumbLabel: "Reddy Anna APK",
  intro:
    "Looking for the official Reddy Anna APK download? This page covers everything — how to get the reddy anna book apk safely, install on Android, enable unknown sources, and log in with your Cricket ID to start betting on IPL and casino games.",
  sections: [
    {
      title: "How to Download Reddy Anna APK",
      content: "Follow these steps to install the official Reddy Anna Book APK on your Android phone:",
      list: [
        "Contact official WhatsApp agent and request APK link",
        "Download the reddy anna apk file to your phone",
        "Settings → Security → Enable Install from Unknown Sources",
        "Open APK file and tap Install",
        "Launch app and login with Reddy Anna credentials",
      ],
    },
    {
      title: "Is Reddy Anna APK Safe?",
      content:
        "Only download from the official WhatsApp agent link. Fake APK files from unknown websites can compromise your account. The official reddy anna online book apk is verified and used by 55,000+ users across India since 2010.",
    },
    {
      title: "Reddy Anna APK vs Reddy Anna App",
      content:
        "Reddy Anna APK and Reddy Anna App refer to the same Android application. APK is the install file format for Android. iPhone users cannot install APK — they use the iOS web app method instead.",
    },
  ],
  relatedLinks: [
    { href: "/reddy-anna-app", label: "Reddy Anna App" },
    { href: "/blog/reddy-anna-app-download-apk", label: "Full Download Guide" },
    { href: "/registration", label: "Register" },
    { href: "/reddy-anna-id", label: "Get ID" },
  ],
};

export const metadata = createLandingPageMetadata(page);

export default function ReddyAnnaApkPage() {
  return <LandingPage {...page} />;
}
