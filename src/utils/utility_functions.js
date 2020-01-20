const getProjects = async () => {
  const endpoint = `http://localhost:3000/projects`;
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export { getProjects };
