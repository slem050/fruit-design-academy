import type { ReactElement } from "react";

type RemoteFillImageProps = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Remote URLs loaded with a plain <img> so they work for any HTTPS host
 * (e.g. admin-set thumbnails) without next/image remotePatterns or the optimizer.
 */
export function RemoteFillImage({ src, alt, className = "" }: RemoteFillImageProps): ReactElement {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional: any HTTPS thumbnail without optimizer allowlist
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover ${className}`.trim()}
    />
  );
}
