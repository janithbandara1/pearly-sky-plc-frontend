import { getImageProps } from "next/image";

/**
 * A CSS `background-image` value served through the Next.js image optimizer
 * (WebP, resized) instead of the raw file in /public.
 */
export function optimizedBackgroundImage(src: string, width: number, height: number): string {
  const {
    props: { srcSet = "" },
  } = getImageProps({ src, alt: "", width, height });
  const imageSet = srcSet
    .split(", ")
    .map((entry) => {
      const [url, density] = entry.split(" ");
      return `url("${url}") ${density}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}
