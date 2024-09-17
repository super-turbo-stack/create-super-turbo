import cfonts from "cfonts";
import { TITLE } from "@/const";

const fontOptions = {
    background: 'transparent',
    letterSpacing: 1,
    lineHeight: 1,
    space: false,
    maxLength: '0',
};

export async function renderTitle(){
    cfonts.say(TITLE.split(" ").join("|"), fontOptions);
    await new Promise((resolve) => setTimeout(resolve, 200));
}
