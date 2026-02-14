export const ROLE_MAP = {
  Student: "student",
  Panel: "panel",
  Adviser: "adviser",
  Dean: "dean",
  "Research Staff": "research",
};

export const getDashboardPath = (userType) => {
  const role = ROLE_MAP[userType];
  return role ? `/${role}/dashboard` : null;
};
