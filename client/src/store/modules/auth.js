import axios from "axios";

const state = {
  user: null,
  exercises: null,
  food: null,
  bmi: null,
  posts: null,
  token: null,
  people: null,
};
const getters = {
  isAuthenticated: (state) => !!state.user,
  StatePosts: (state) => state.posts,
  StateUser: (state) => state.user,
  StateToken: (state) => state.token,
  StateExercises: (state) => state.exercises,
  StateFood: (state) => state.food,
  StatePeople: (state) => state.people,
  StateBMI: (state) => state.bmi,
};

const actions = {
  async Register({ dispatch }, form) {
    await axios.post("auth/register", form);
    let UserForm = {};
    UserForm.userName = form.userName;
    UserForm.password = form.password;
    await dispatch("LogIn", UserForm);
  },

  async LogIn({ commit }, User) {
    const { data } = await axios.post("auth/login", User);
    await commit("setToken", data.token);

    await commit("setUser", data.user);
  },
  async CreatePost({ dispatch, getters }, post) {
    let token = getters.StateToken;
    if (token) {
      await axios.post("/posts", post, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await dispatch("GetPosts");
    }
  },

  async GetPosts({ commit, getters }) {
    let token = getters.StateToken;
    if (token) {
      let response = await axios.get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      commit("setPosts", response.data);
    }
  },

  async LogOut({ commit }) {
    let user = null;
    commit("LogOut", user);
  },

  async UpdateUser({ commit, getters }, User) {
    let token = getters.StateToken;
    let user = getters.StateUser;
    if (token) {
      await axios.patch(`/users/${user.id}`, User);
      await commit("setUser", User);
    }
  },

  async FollowUser({ commit, getters }, userName) {
    const { data } = await axios.post(
      `/users/follow/${userName}`,
      {},
      { headers: { Authorization: `Bearer ${getters.StateToken}` } }
    );

    if (data) await commit("setUser", data);
    console.log(getters.StateUser);
  },

  async RemoveFollower({ commit, getters }, userName) {
    const { data } = await axios.post(
      `/users/remove/follower/${userName}`,
      {},
      { headers: { Authorization: `Bearer ${getters.StateToken}` } }
    );
    await commit("setUser", data);
    console.log(getters.StateUser);
  },
  async UnfollowUser({ commit, getters }, userName) {
    const { data } = await axios.post(
      `/users/unfollow/${userName}`,
      {},
      { headers: { Authorization: `Bearer ${getters.StateToken}` } }
    );
    await commit("setUser", data);
  },

  async GetExercises({ commit, getters }) {
    let token = getters.StateToken;
    if (token) {
      const { data } = await axios.get("/inputs/exercise", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await commit("setExercises", data);
      console.log(getters.exercises);
    }
  },

  async AddExercise({ dispatch, getters }, exercise) {
    let token = getters.StateToken;
    let user = getters.StateUser;

    if (token) {
      exercise.userName = user.userName;
      await axios.post("/inputs/exercise", exercise, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await dispatch("GetExercises");
    }
  },

  async GetFood({ commit, getters }) {
    let token = getters.StateToken;
    if (token) {
      const { data } = await axios.get("/inputs/food", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await commit("setFood", data);
    }
  },

  async AddFood({ dispatch, getters }, food) {
    let token = getters.StateToken;
    let user = getters.StateUser;

    if (token) {
      food.userName = user.userName;
      await axios.post("/inputs/food", food, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await dispatch("GetFood");
    }
  },

  async GetBMI({ commit, getters }) {
    let token = getters.StateToken;
    if (token) {
      const { data } = await axios.get("/inputs/bmi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await commit("setBMI", data);
    }
  },

  async AddBMI({ dispatch, getters }, bmi) {
    let token = getters.StateToken;
    let user = getters.StateUser;

    if (token) {
      bmi.userName = user.userName;
      await axios.post("/inputs/bmi", bmi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await dispatch("GetBMI");
    }
  },

  async GetPeople({ commit, getters }) {
    let token = getters.StateToken;
    if (token) {
      const { data } = await axios.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      await commit("setPeople", data);
    }
  },
};

const mutations = {
  setUser(state, user) {
    state.user = { ...state.user, ...user };
  },
  setToken(state, token) {
    state.token = token;
  },
  setPosts(state, posts) {
    state.posts = posts;
  },
  setExercises(state, exercises) {
    state.exercises = exercises;
  },
  setFood(state, food) {
    state.food = food;
  },
  setBMI(state, bmi) {
    state.bmi = bmi;
  },
  setPeople(state, people) {
    state.people = people.users;
  },
  LogOut(state) {
    state.user = null;
    state.posts = null;
    state.token = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
