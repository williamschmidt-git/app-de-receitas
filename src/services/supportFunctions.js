import copy from 'clipboard-copy';

export const getInProgressStoraged = (recipeType, recipeID, targetName) => {
  const stored = localStorage.getItem('inProgressRecipes');
  const parseRecipesInProgress = JSON.parse(stored);
  const progressTypeID = parseRecipesInProgress[recipeType][recipeID];
  if (!progressTypeID) {
    parseRecipesInProgress[recipeType][recipeID] = [targetName];
    return localStorage
      .setItem('inProgressRecipes', JSON.stringify(parseRecipesInProgress));
  }
  if (progressTypeID.includes(targetName)) {
    const ingredientIndex = progressTypeID
      .indexOf(targetName);
    progressTypeID.splice(ingredientIndex, 1);
  } else {
    progressTypeID.push(targetName);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(parseRecipesInProgress));
};

export const getProgressStored = (ingredient, recipeID, inProgressStored, recipeType) => {
  if (inProgressStored[recipeType][recipeID]) {
    const mealsInProgress = inProgressStored[recipeType][recipeID];
    return mealsInProgress.some((item) => item === ingredient[0]);
  }
};

export const onClipboardClicked = (setClipboardState, id) => {
  copy(`http://localhost:3000/bebidas/${id}`);
  setClipboardState(true);
  const ONDE_SECOND = 1000;
  setTimeout(() => {
    setClipboardState(false);
  }, ONDE_SECOND);
};

// export const teste = (, id, setStoredProgress) => {
//   const stored = localStorage.getItem('inProgressRecipes');
//   const parseRecipesInProgress = JSON.parse(stored);
//   if (!parseRecipesInProgress) {
//     const inProgressRecipes = {
//       cocktails: {},
//       meals: {
//         [id]: [],
//       },
//     };
//     setStoredProgress(inProgressRecipes);
//     localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
//   } else {
//     setStoredProgress(parseRecipesInProgress);
//   }
//   const stored = localStorage.getItem('inProgressRecipes');
//     const parseRecipesInProgress = JSON.parse(stored);
//     if (!parseRecipesInProgress) {
//       const inProgressRecipes = {
//         cocktails: {
//           [id]: [],
//         },
//         meals: {},
//       };
//       setStoredProgress(inProgressRecipes);
//       localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
//     } else {
//       setStoredProgress(parseRecipesInProgress);
//     }
// };
