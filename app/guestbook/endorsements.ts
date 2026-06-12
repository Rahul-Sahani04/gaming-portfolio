export interface Endorsement {
  id: string;
  name: string;
  role: string;
  message: string;
  avatar: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  instagram?: string;
  pinterest?: string;
  twitter?: string;
  memeUrl?: string;
}

// All endorsements are now submitted via invite links (/invite/[token])
// and stored in Redis under "endorsements:dynamic".
// See endorsements.backup.ts for the original hardcoded entries.
export const endorsements: Endorsement[] = [
  {
    id: "1",
    name: "Nikita",
    role: "Human being ",
    message: "Calm,cool,collected and catastrophically attached.\n",
    avatar: "https://kmdn9krae4.ufs.sh/f/R1EGMD28jQScR9oBM28jQSc6P1xCBLdO2zVfDkWp0bKysFXE",
    memeUrl: "https://kmdn9krae4.ufs.sh/f/R1EGMD28jQScupRd7NHhAFC7cH2IE3va8qGeJWmYPDpLzgXx",

  },
  {
    id: "2",
    name: "Rahul ",
    role: "Portfolio Tester",
    message: "Sorry to disturb you all! This is just a test message, so feel free to ignore it. Thanks for stopping by, and please check out my friends messages.",
    avatar: "https://utfs.io/f/R1EGMD28jQSc6churSOaw5TJtqBzc3QIhSDCAerWGPHvp9iM",
    memeUrl: "https://utfs.io/f/R1EGMD28jQScEan9zBRP61JoCwIzZt5yqVTRWja2QvhrmGUf",
    linkedin: "https://linkedin.com/in/rahul1sahani",
    github: "https://github.com/Rahul-Sahani04/",
  },
  {
    id: "3",
    name: "Ritu Kanyal",
    role: "MISS UNIVERSE · Creator | Data Engineer",
    message: "\"You can't lose something you never had.\"\n\n\"What\'s meant for you will never pass you by. It will find you when the time is right🌷\"",
    avatar: "/friends-avatar/ritu-kanyal.webp",
    linkedin: "https://www.linkedin.com/in/ritu-kanyal/",
    youtube: "https://www.youtube.com/@Ritu_kanyal",
    instagram: "https://www.instagram.com/ritu_kanyal/",
    pinterest: "https://in.pinterest.com/ritzy_server/",
  },
  {
    id: "4",
    name: "Tushar Gupta (Danish Bhai)",
    role: "Software Engineer",
    message: "Rahul is one of the most talented developers I've ever met. His technical skills, problem-solving ability, and dedication to excellence are truly remarkable. I still remember a coding challenge where he was literally blindfolded and still managed to win, which speaks volumes about his confidence and expertise. He has an exceptional ability to solve complex problems and consistently delivers high-quality work. Beyond being a great developer, Rahul is humble, supportive, and a fantastic person to work with. I can confidently say he is among the best developers I know and someone I would highly recommend.",
    avatar: "/friends-avatar/tushar-gupta.jpeg",
    linkedin: "https://www.linkedin.com/in/tushar-gupta-5666ba23b",
  },
  {
    id: "5",
    name: "Mrinal Singh",
    role: "Full Stack Engineer",
    message: "Rahul ki aankhon me humesha mene havas dekhi.\nYe ladka mujhe dekhte hi pasand aagya tha prr me tehra pakka lesbian.\n\nBande ne meri bohot help kari college me,  as a bihari mujhe laga dihadi mangega prr nahi.\n\nYe dil ka bohot saaf nikla,  (ps: I love you).\n\nAur haan he used to jack off to a character from valorant. Pspspsps.",
    avatar: "/friends-avatar/mrinal.jpg",
    linkedin: "https://www.linkedin.com/in/mrinal-singh1967",
  },
  {
    id: "6",
    name: "Hemant Singh",
    role: "Friend",
    message: "Rahul my nigga 🫂🫂 \nThanks for always helping me.\nI hope teri body ban jaye jaldi 🙏\nThat's it \nI wish u get pegged by ur wife every night or by me🙏",
    avatar: "/friends-avatar/Hemant-Singh.jpg",
    linkedin: "https://www.linkedin.com/in/heyymant-singh",
    instagram: "https://www.instagram.com/prewinterseason",
  },];
