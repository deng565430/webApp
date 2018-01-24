class UserService {
  constructor() {}
  get(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`Hello Word【${id}】`);
      }, 1000);
    });
  }
}

export default UserService;
