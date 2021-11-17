const getMusics = async (id) => {
  console.log("Chegou em getMusics o id:", id);
  const request = await fetch(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
  const requestJson = await request.json();
  return requestJson.results;
};

export default getMusics;
