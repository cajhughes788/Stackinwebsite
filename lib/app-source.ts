export const IOS_APP_SOURCE = "ios-app";

export type AppSource = typeof IOS_APP_SOURCE;

export function getAppSource(
  value: string | string[] | null | undefined,
): AppSource | null {
  const source = Array.isArray(value) ? value[0] : value;

  return source === IOS_APP_SOURCE ? IOS_APP_SOURCE : null;
}

export function withAppSource(
  path: string,
  source: string | string[] | null | undefined,
): string {
  const normalizedSource = getAppSource(source);

  if (!normalizedSource) {
    return path;
  }

  const url = new URL(path, "https://stackin.local");
  url.searchParams.set("source", normalizedSource);

  return `${url.pathname}${url.search}${url.hash}`;
}
