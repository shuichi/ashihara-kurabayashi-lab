import { photography, type PhotoId } from "@/app/photography";
import { useSite } from "./site-shell";

export function ActivityPhoto({
  id,
  sizes,
  caption = true,
}: {
  id: PhotoId;
  sizes: string;
  caption?: boolean;
}) {
  const { language, photos } = useSite();
  const image = photos[id];
  if (!image) throw new Error(`Missing activity photo: ${id}`);
  const text = photography[language].photos[id];
  const picture = (
    <picture className="activity-photo">
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.src}
        srcSet={image.webp}
        sizes={sizes}
        alt={text.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
  return caption ? (
    <figure className="activity-figure">
      {picture}
      <figcaption>{text.caption}</figcaption>
    </figure>
  ) : (
    picture
  );
}
