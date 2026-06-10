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
}

export const endorsements: Endorsement[] = [
  {
    id: "1",
    name: "Ritu Kanyal (MISS UNIVERSE)",
    role: "Creator",
    message: "\"You can't lose something you never had.\"\n\"What's meant for you will never pass you by. It will find you when the time is right🌷\"",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Ritu2",
    linkedin: "https://www.linkedin.com/in/ritu-kanyal/",
    youtube: "https://www.youtube.com/@Ritu_kanyal",
    instagram: "https://www.instagram.com/ritu_kanyal/",
    pinterest: "https://in.pinterest.com/ritzy_server/",
  },
  {
    id: "2",
    name: "Tushar Gupta",
    role: "Software Engineer",
    message: "Rahul is one of the most talented developers I've ever met. His technical skills, problem-solving ability, and dedication to excellence are truly remarkable. I still remember a coding challenge where he was literally blindfolded and still managed to win, which speaks volumes about his confidence and expertise. He has an exceptional ability to solve complex problems and consistently delivers high-quality work. Beyond being a great developer, Rahul is humble, supportive, and a fantastic person to work with. I can confidently say he is among the best developers I know and someone I would highly recommend.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Gupta",
    linkedin: "https://www.linkedin.com/in/tushar-gupta-5666ba23b",
  }
];
