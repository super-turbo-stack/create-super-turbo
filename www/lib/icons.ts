import { type Icon as LucideIconType } from "lucide-react";
import { FaCheck, FaGithub } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";

const icons = {
  github: FaGithub,
  copy: IoCopyOutline,
  check: FaCheck,
};
export type IconType = typeof LucideIconType;
export default icons;
