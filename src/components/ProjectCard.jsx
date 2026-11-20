import { ArrowUpRight, Sparkles } from 'lucide-react';

function formatCategory(category) {
  return category?.replaceAll('_', ' ') || 'Featured';
}

export default function ProjectCard({ project }) {
  const { title, category, description, tools, image_url: imageUrl } = project;

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#eadfe6] bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#84526d]/10">
      <div className="relative grid h-48 place-items-center overflow-hidden bg-gradient-to-br from-[#f7eaf1] via-[#fdf6fa] to-[#ece3f0]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-16 w-16 place-items-center rounded-full border border-white/80 bg-white/70 text-[#b96d95] shadow-sm">
            <Sparkles size={26} strokeWidth={1.6} aria-hidden="true" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full border border-[#eadfe6] bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#8c5574]">
          {formatCategory(category)}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold leading-snug text-[#493943]">{title}</h3>
          <ArrowUpRight size={18} className="mt-1 shrink-0 text-[#b96d95]" aria-hidden="true" />
        </div>
        <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-[#817681]">{description}</p>
        {tools && <p className="mt-4 text-xs font-semibold text-[#a85f86]">{tools}</p>}
      </div>
    </article>
  );
}
