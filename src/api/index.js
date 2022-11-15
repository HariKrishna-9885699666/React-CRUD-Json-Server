import axios from "axios";
const baseUrl = "http://localhost:3001/users";

export async function loadUsers(filter, setLoading) {
    if (setLoading) setLoading(true);
    return await axios.get(baseUrl).then((res) => {
      let userData = res.data.reverse();
      if (setLoading) setLoading(false);
      return filter !== 'all' ? userData.filter(item => !item.isDeleted) : userData
    });
}

export async function addUser(userObj) {
  return await axios.post(baseUrl, userObj);
}

export async function updateUser(id, userObj) {
  return axios.put(`${baseUrl}/${id}`, userObj);
}

export async function getUser(id) {
  return axios.get(`${baseUrl}/${id}`).then((res) => {
    return res.data;
  });
}