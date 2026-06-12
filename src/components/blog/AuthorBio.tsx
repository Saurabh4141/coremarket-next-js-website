import { Linkedin, Twitter } from "lucide-react";

interface AuthorBioProps {
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
}

export const AuthorBio = ({ author }: AuthorBioProps) => {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <img
          src={author.avatar}
          alt={author.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-primary/10 shrink-0"
        />
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            {author.name}
          </h3>
          <p className="text-primary font-medium text-sm mb-3">{author.role}</p>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {author.bio}
          </p>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
