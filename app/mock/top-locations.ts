import { DoorOpen, Leaf, Sun, Droplets, Briefcase, Sofa } from "lucide-react";

const topLocations = [
  {
    name: "Main entrance",
    icon: DoorOpen,
    colors: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100",
  },
  {
    name: "Green Pavilion",
    icon: Leaf,
    colors:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-700 dark:text-emerald-100",
  },
  {
    name: "Yellow Pavilion",
    icon: Sun,
    colors: "bg-amber-100 text-amber-700 dark:bg-amber-700 dark:text-amber-100",
  },
  {
    name: "Blue Pavilion",
    icon: Droplets,
    colors: "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100",
  },
  {
    name: "Cowork space",
    icon: Briefcase,
    colors:
      "bg-purple-100 text-purple-700 dark:bg-purple-700 dark:text-purple-100",
  },
  {
    name: "Chillout area",
    icon: Sofa,
    colors:
      "bg-orange-100 text-orange-700 dark:bg-orange-700 dark:text-orange-100",
  },
];

export default topLocations;
