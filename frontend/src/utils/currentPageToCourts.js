import { courtNames } from "./courtNames";

export const currentPageToCourts = (currentPage) => {
  let displayedCourtNumbers = [];
  let displayedCourtNames = [];

  if (currentPage === 6) {
    displayedCourtNumbers = [25, 26];
    displayedCourtNames = courtNames.slice(25, 27);
  } else {
    for (let index = 5 * (currentPage - 1); index < 5 * currentPage; index++) {
      displayedCourtNumbers.push(index);
      displayedCourtNames.push(courtNames[index]);
    }
  }

  return { displayedCourtNames, displayedCourtNumbers }
};
