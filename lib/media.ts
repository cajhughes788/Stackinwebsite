import { MEDIA_VERSIONS } from "./media-versions";

/** A file in public/media or public/images, with its content fingerprint as ?v=. */
export function media(path: string) {
  const v = MEDIA_VERSIONS[path];
  return v ? `${path}?v=${v}` : path;
}
