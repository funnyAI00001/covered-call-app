const imageUrlFromPlayerName = (name) => {
  if (name === "Juan Manuel Cerundolo") {
    return "/images/players/Juan-Manuel_Cerundolo.jpg";
  } else if (name === "Santiago_Gonzalez") {
    return "/images/players/Santiago_Gonzalez.jpg";
  } else {
    const lastname = name.split(" ");
    return "/images/players/" + lastname[lastname.length - 1] + ".jpg";
  }
};
export default imageUrlFromPlayerName;

export const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const offsetInHours = () => {
  const date = new Date();
  const offsetInMinutes = date.getTimezoneOffset();
  const offsetInHours = offsetInMinutes / 60;

  return offsetInHours;
};

export const getTimeTexts = () => {
  const initialTexts = [
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12,
  ];

  const offset = offsetInHours();
  const timeTexts = [];

  for (let index = 0; index < 12; index++) {
    timeTexts.push(((initialTexts[index] - offset + 24) % 24) + ":00");
    timeTexts.push(((initialTexts[index] - offset + 24) % 24) + ":30");
  }

  return timeTexts;
};
