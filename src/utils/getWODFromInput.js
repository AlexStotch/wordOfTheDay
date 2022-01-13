function getWODFromInput(event) {
  const input = event.text;
  const endUserId = input.indexOf('>');
  return input.slice(endUserId + 1);
}

export default getWODFromInput;
