// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useInitialsName(name: any) {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");

  if (name) {
    let initials = [...name.matchAll(rgx)] || [];

    initials = (
      (initials.shift()?.[1] || "") + (initials.pop()?.[1] || "")
    ).toUpperCase();

    return initials;
  }
  return null;
}
