const filterCharacter = (input) => {
  const badwords = ["damn", "bullshit"];
  let result = input.trim().replace(/\s+/g, " ");

  const regex = new RegExp(`\\b(${badwords.join("|")})\\b`, "gi");

  result = result.replace(regex, "***");
  return result;
};

console.log(filterCharacter("This is   a damn test.  No bullshit here!"));
