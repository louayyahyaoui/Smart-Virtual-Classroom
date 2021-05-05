import axios from "axios";

export const api = axios.create({
  baseURL: "https://closer-server.herokuapp.com/",
  responseType: "json",
});
export const notificationsApi = {
  async getNotification(id) {
    const { data } = await api.get(`https://closer-server.herokuapp.com/notification/${id}`);
    return data;
  }, 
  async addNotification(notif) {
    const { data } = await api.post(`https://closer-server.herokuapp.com/notification/add`,notif);
    return data;
  },
  async putNotification(id) {
    const { data } = await api.put(`https://closer-server.herokuapp.com/notification/update/${id}`);
    return data;
  },
  async deleteNotification(id) {
    const { data } = await api.delete(`https://closer-server.herokuapp.com/notification/delete/${id}`);
    return data;
  },
};
export const questionsApi = {
  async getQuestions(id) {
    const { data } = await api.get(`question/c/${id}`);
    return data;
  },
  async getQuestionsByTags(id,tag) {
    const { data } = await api.get(`question/findTag/${id}/${tag}`);
    return data;
  },

};

export const answersApi = {
  async getAnswers(id) {
    const { data } = await api.get(`answer/q/${id}`);
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
    const { data } = await api.get(`coursesComment/task/${id}`);
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
/// hamza
  export const getclassApi = {
    async getclassByLevel(iduser,status) {
      const { data } = await api.get(`class/bylevel/${iduser}/${status}`);
      return data;
    },
    async getUserByEmail(email) {
      const { data } = await api.get(`class/email/` + email);
      return data;
    },
    async getUserByid(id) {
      const { data } = await api.get(`class/userid/` + id);
      return data;
    },
    async getUsersAll() {
      const { data } = await api.get(`class/usersall/`);
      return data;
    },
    async CountActiveClass(id) {
      const { data } = await api.get(`class/countactive/` + id);
      return data;
    },
    async getclassByYear(iduser,status) {
      const { data } = await api.get(`class/byyear/${iduser}/${status}`);
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
    async getClassInvitationClassId(id) {
      const { data } = await api.get(`invitationclass/inviteclassid/` + id);
      return data;
    },
    async CountRequestClass(id) {
      const { data } = await api.get(`invitationclass/countrequest/` + id);
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
    async updateClassActive(id) {
      const { data } = await api.put(`class/update/archive/${id}`);
      return data;
    },
    async updateClassArchive(id) {
      const { data } = await api.put(`class/update/active/${id}`);
      return data;
    },
    async deleteClass(id) {
      const { data } = await api.delete(`class/${id}`);
      return data;
    },
  };
export default api;
