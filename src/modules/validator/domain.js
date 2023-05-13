export const isValidDomain = async (domain) => {
  try {
    new URL(`https://${domain}/`);
    return true;
  } catch (err) {
    return false;
  }
};
