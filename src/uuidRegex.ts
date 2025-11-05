const uuidRegex = (uuid: string): RegExpMatchArray | null => {
  // Check if the string matches UUID format (with hyphens) first
  const uuidRegex: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuid.match(uuidRegex);
};
export { uuidRegex };
