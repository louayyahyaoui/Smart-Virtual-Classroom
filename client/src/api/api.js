import axios from "axios";

export const api = axios.create({
  baseURL: "https://closer-server.herokuapp.com/",
  responseType: "json",
});
export const questionsApi = {
  async getQuestions(id) {
    const { data } = await api.get(`question/c/${id}`);
    return data;
  },
};
export const answersApi = {
  async getAnswers(id) {
    console.log(id);
    const { data } = await api.get(`answer/q/${id}`);
    console.log(data);
    return data;
  },
};
export const AddquestionsApi = {
  async postQuestions(questionn) {
    const { data } = await api.post(`question/add/`, questionn);
    return data;
  },
  async uploadFileQuestions(formData, config) {
    return await api.post(`question/upload/`, formData, config);
  },

  async putQuestions(newquestionn, id) {
    const { data } = await api.put(`question/update/${id}`, newquestionn);
    return data;
  },
  async deleteQuestions(id) {
    const { data } = await api.delete(`question/delete/${id}`);
    return data;
  },
};
export const AddAnswersApi = {
  async postAnswers(answer) {
    const { data } = await api.post(`answer/add/`, answer);
    return data;
  },
  async deleteAnswers(id) {
    const { data } = await api.delete(`answer/delete/${id}`);
    return data;
  },
  async putAnswers(newanswer, id) {
    const { data } = await api.put(`answer/update/${id}`, newanswer);
    return data;
  },

  //comments
  
  //Hamza
};
export const CommentsApi = {
  async getCommentsCourse(id) {
    
    const { data } = await api.get(`coursesComment/course/${id}`);
   
    return data;
  },
  async getCommentsTask(id) {
    console.log(id);
    const { data } = await api.get(`coursesComment/task/${id}`);
    console.log(data);
    return data;
  },
  
  async postComments(comment) {
    const { data } = await api.post(`coursesComment/add/`, comment);
    return data;
  },
  async deleteComments(id) {
    const { data } = await api.delete(`coursesComment/delete/${id}`);
    return data;
  },
  async putComments(newcomment, id) {
    const { data } = await api.put(`coursesComment/update/${id}`, newcomment);
    return data;
  }};
export const getclassApi = {
  async getclassByLevel(iduser) {
    const { data } = await api.get(`class/bylevel/` + iduser);
    return data;
  },
  async getUserByEmail(email) {
    const { data } = await api.get(`class/email/` + email);
    return data;
  },
  async getclassByYear(iduser) {
    const { data } = await api.get(`class/byyear/` + iduser);
    return data;
  },
  async getclassById(idclass) {
    const { data } = await api.get(`class/` + idclass);
    return data;
  },
};
export const ClassInvitationApi = {
  async getClassInvitation(email) {
    const { data } = await api.get(`invitationclass/` + email);
    return data;
  },
  async AddClassInvitation(add) {
    const { data } = await api.post(`invitationclass/`,add);
    return data;
  },
  async deleteClassInvitation(id) {
    const { data } = await api.delete(`invitationclass/${id}`);
    return data;
  },
};
export const AddclassApi = {
  async addClass(cl) {
    const { data } = await api.post(`class/`, cl);
    return data;
  },
  async updateClass(id,cl) {
    const { data } = await api.put(`class/${id}`, cl);
    return data;
  },
  async addUserToClass(idclass,email) {
    const { data } = await api.put(`class/${idclass}/${email}`);
    return data;
  },
  async removeUserFromClass(idclass,email) {
    const { data } = await api.put(`class/r/${idclass}/${email}`);
    return data;
  },
  async deleteClass(id) {
    const { data } = await api.delete(`class/${id}`);
    return data;
  },
};
export default api;
